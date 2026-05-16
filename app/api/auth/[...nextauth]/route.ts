import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt", // Using JSON Web Tokens for fast session checks
  },
  providers: [
    CredentialsProvider({
      name: "Security PIN",
      credentials: {
        email: { label: "Email", type: "email" },
        securityPin: { label: "Security PIN", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.securityPin) return null;

        // 1. Look for the user in your AWS RDS via Prisma
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        // 2. Compare the pin (matching your current plain-text registration logic)
        if (user && user.securityPin === credentials.securityPin) {
          return {
            id: user.id,
            email: user.email,
            name: user.fullName,
          };
        }
        
        // 3. If login fails
        return null;
      }
    })
  ],
  callbacks: {
    // These ensure your userId is available in the session
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET, // You'll need to add this to .env
});

export { handler as GET, handler as POST };