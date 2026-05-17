import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { encrypt, decrypt } from '@/lib/encryption';
import { getServerSession } from "next-auth/next";

export async function GET(request: Request) { // Added 'request' to access URL params
  try {
    const session = await getServerSession();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Extract the category from the URL (e.g., /api/vault?category=Medical)
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    // 2. Fetch items with the pillar filter
    const items = await prisma.vaultItem.findMany({
      where: { 
        user: { email: session.user.email! },
        // Use the pillar index we created in the schema
        ...(category ? { category: { equals: category, mode: 'insensitive' } } : {})
      },
      orderBy: { createdAt: 'desc' },
    });

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
    const session = await getServerSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, secret, category, type } = body;

    if (!secret || !category) {
      return NextResponse.json({ error: 'Missing secret or category' }, { status: 400 });
    }

    // 3. Create entry tied to the logged-in user's email
    const entry = await prisma.vaultItem.create({
      data: {
        title: title || 'Untitled Entry',
        content: encrypt(secret), 
        category: category, // Matches the schema categories like 'Vault' or 'Medical' 
        type: type || 'Note',
        user: { connect: { email: session.user.email! } }
      },
    });

    return NextResponse.json({ 
      success: true, 
      id: entry.id,
      message: `${category} item secured` 
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}