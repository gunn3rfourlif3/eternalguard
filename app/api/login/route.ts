import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, securityPin } = body;

    // 1. Validation
    if (!email || !securityPin) {
      return NextResponse.json(
        { error: 'Missing credentials' },
        { status: 400 }
      );
    }

    // 2. Find user in RDS
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // 3. Compare securityPin directly (Matching your working registration logic)
    if (!user || user.securityPin !== securityPin) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // 4. Create session token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'dev_secret',
      { expiresIn: '8h' }
    );

    const response = NextResponse.json({ 
      success: true, 
      message: "Login successful" 
    });

    // 5. Set auth cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 28800,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}