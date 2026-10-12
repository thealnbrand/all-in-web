import { NextRequest, NextResponse } from 'next/server';
import {
  validateMasterKey,
  generateSessionToken,
  isAuthenticated,
  ADMIN_COOKIE_NAME,
} from '@/lib/adminAuth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const key = body?.key;

    if (!key || typeof key !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Access key is required' },
        { status: 400 }
      );
    }

    const isValid = validateMasterKey(key);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid Studio Passphrase / Key' },
        { status: 401 }
      );
    }

    const token = generateSessionToken();
    const response = NextResponse.json(
      { success: true, message: 'Studio clearance granted' },
      { status: 200 }
    );

    // Set secure HTTP-only session cookie (14 days)
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 14 * 24 * 60 * 60, // 14 days
    });

    return response;
  } catch (error) {
    console.error('[Admin Auth Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Internal authentication error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const authenticated = isAuthenticated(req);
  return NextResponse.json({ authenticated }, { status: 200 });
}

export async function DELETE() {
  const response = NextResponse.json(
    { success: true, message: 'Session terminated' },
    { status: 200 }
  );

  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
}
