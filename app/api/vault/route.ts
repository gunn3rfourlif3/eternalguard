import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { encrypt, decrypt } from '@/lib/encryption';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const items = await prisma.vaultItem.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    // SAFE DECRYPTION: Checks if content is in the encrypted format (iv:authTag:content)
    const decryptedItems = items.map(item => {
      try {
        // Our encrypted format always contains ':' separators
        if (item.content && item.content.includes(':')) {
          return {
            ...item,
            content: decrypt(item.content)
          };
        }
        // Return legacy plain-text as-is to avoid 500 errors
        return item; 
      } catch (e) {
        console.error(`Failed to decrypt item ${item.id}:`, e);
        return { ...item, content: "[Decryption Error]" };
      }
    });

    return NextResponse.json({ success: true, items: decryptedItems });
  } catch (error: any) {
    console.error('Vault GET Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
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