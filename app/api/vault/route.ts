import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { encrypt, decrypt } from '@/lib/encryption';
import { getServerSession } from "next-auth/next";

export async function GET() {
  try {
    // 1. Get the session from the server (secure)
    const session = await getServerSession();

    // 2. If no session, block access
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 3. Fetch items belonging ONLY to this user's email
    const items = await prisma.vaultItem.findMany({
      where: { 
        user: { email: session.user.email! } 
      },
      orderBy: { createdAt: 'desc' },
    });

    // 4. Decrypt the content
    const decryptedItems = items.map(item => {
      try {
        return item.content.includes(':') 
          ? { ...item, content: decrypt(item.content) } 
          : item;
      } catch (e) {
        return { ...item, content: "[Decryption Error]" };
      }
    });

    return NextResponse.json({ success: true, items: decryptedItems });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, title, secret, category } = body;

    if (!userId || !secret) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    // Encrypt the secret before it hits your AWS RDS instance
    const entry = await prisma.vaultItem.create({
      data: {
        userId,
        title: title || 'Untitled Secret',
        content: encrypt(secret), 
        category: category || 'General',
      },
    });

    return NextResponse.json({ 
      success: true, 
      id: entry.id,
      message: "Secret encrypted and stored" 
    });
  } catch (error: any) {
    console.error('Vault POST Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}