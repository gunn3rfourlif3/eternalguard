import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, securityPin } = body;

    // 1. Basic validation
    if (!fullName || !email || !securityPin) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 2. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // 3. Create the user in your AWS database
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        securityPin, // Note: We will add hashing/encryption in the next phase
        verificationPercentage: 0,
        isPremiumPaid: false,
      },
    });

    return NextResponse.json(
      { message: 'User registered successfully', userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}