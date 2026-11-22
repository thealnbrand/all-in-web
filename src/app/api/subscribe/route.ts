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

    const rawInterests = Array.isArray(body.interests) ? body.interests : [];
    const validInterests = ['clothes', 'digital_products', 'systems'];
    const interests = rawInterests.filter((i: string) => validInterests.includes(i));

    // If none explicitly selected, fallback to all valid channels
    const finalInterests = interests.length > 0 ? interests : validInterests;

    if (isSupabaseConfigured()) {
      const supabase = getServerSupabase();
      if (supabase) {
        try {
          // Attempt upsert with interests array column
          const { error: dbErr } = await supabase.from('studio_subscribers').upsert(
            [
              {
                email,
                interests: finalInterests,
                source: body.source || 'landing_philosophy',
                updated_at: new Date().toISOString(),
              },
            ],
            { onConflict: 'email' }
          );

          if (dbErr) {
            console.warn('Supabase subscribe insert note, attempting fallback:', dbErr.message);
            // Fallback if column `interests` doesn't exist yet before SQL migration is executed
            await supabase.from('studio_subscribers').upsert(
              [
                {
                  email,
                  source: `${body.source || 'landing_philosophy'} [channels:${finalInterests.join(',')}]`,
                  created_at: new Date().toISOString(),
                },
              ],
              { onConflict: 'email' }
            );
          }
        } catch (dbErr) {
          console.warn('Supabase subscribe insert note:', dbErr);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Subscription confirmed. Welcome to the studio network.',
      email,
      interests: finalInterests,
    });
  } catch (err) {
    console.error('Subscribe API error:', err);
    return NextResponse.json(
      { success: false, error: 'Subscription failed. Please try again.' },
      { status: 500 }
    );
  }
}
