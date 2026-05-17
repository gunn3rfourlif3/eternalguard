import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { encrypt, decrypt } from '@/lib/encryption';
import { getServerSession } from "next-auth/next";

export async function GET(request: Request) {
  try {
    const session = await getServerSession();
    if (!session || !session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const getProgress = searchParams.get('progress') === 'true';

    if (getProgress) {
      const categoriesWithData = await prisma.vaultItem.groupBy({
        by: ['category'],
        where: { user: { email: session.user.email! } },
      });
      const percentage = Math.round((categoriesWithData.length / 6) * 100);
      return NextResponse.json({ success: true, percentage });
    }

    const items = await prisma.vaultItem.findMany({
      where: { 
        user: { email: session.user.email! },
        ...(category ? { category: { equals: category, mode: 'insensitive' } } : {})
      },
      orderBy: { createdAt: 'desc' },
    });

    const decryptedItems = items.map(item => {
      try {
        return item.content.includes(':') ? { ...item, content: decrypt(item.content) } : item;
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
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { title, secret, category, type } = await request.json();
    const entry = await prisma.vaultItem.create({
      data: {
        title: title || 'Untitled',
        content: encrypt(secret), 
        category, 
        type: type || 'Note',
        user: { connect: { email: session.user.email! } }
      },
    });
    return NextResponse.json({ success: true, id: entry.id });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id, title, secret, category, type } = await request.json();
    await prisma.vaultItem.update({
      where: { id, user: { email: session.user.email! } },
      data: { title, content: encrypt(secret), category, type }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await prisma.vaultItem.delete({
      where: { id, user: { email: session.user.email! } }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}