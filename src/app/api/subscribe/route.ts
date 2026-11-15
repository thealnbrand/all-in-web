import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email || '').trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (isSupabaseConfigured()) {
      const supabase = getServerSupabase();
      if (supabase) {
        try {
          await supabase.from('studio_subscribers').insert([
            {
              email,
              source: body.source || 'landing_philosophy',
              created_at: new Date().toISOString(),
            },
          ]);
        } catch (dbErr) {
          console.warn('Supabase subscribe insert note:', dbErr);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Subscription confirmed. Welcome to the studio network.',
    });
  } catch (err) {
    console.error('Subscribe API error:', err);
    return NextResponse.json(
      { success: false, error: 'Subscription failed. Please try again.' },
      { status: 500 }
    );
  }
}
