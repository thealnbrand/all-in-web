import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email || '').trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'INVALID_SYNTAX: Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // If Supabase is connected, optionally store in newsletter_subscribers or inquiries
    if (isSupabaseConfigured()) {
      try {
        const supabase = getServerSupabase();
        if (supabase) {
          await supabase.from('newsletter_subscribers').insert({
            email,
            channel: 'philosophy_dispatch',
            created_at: new Date().toISOString(),
          });
        }
      } catch {
        // Fallback gracefully without breaking user flow if table isn't created yet
      }
    }

    return NextResponse.json({
      success: true,
      message: 'DISPATCH_ACK: Subscription confirmed. Welcome to ALL IN dispatches.',
      email,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: 'SERVER_FAULT: Unable to register dispatch subscriber.' },
      { status: 500 }
    );
  }
}
