import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

// Protect these routes - if a user isn't logged in, they go to /login
export const config = { 
  matcher: ["/dashboard/:path*", "/"] 
};