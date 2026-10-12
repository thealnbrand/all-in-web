import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase, isSupabaseConfigured } from '@/lib/supabaseClient';

interface InquireRequestBody {
  name?: string;
  email?: string;
  category?: string;
  budgetScope?: string;
  subject?: string;
  message?: string;
  honeypot?: string; // Hidden anti-bot field
}

export async function POST(req: NextRequest) {
  try {
    const body: InquireRequestBody = await req.json();

    // 1. Anti-bot honeypot check
    if (body.honeypot) {
      // Silently drop bot requests
      return NextResponse.json({ success: true, message: 'Inquiry received' });
    }

    // 2. Extract & sanitize inputs
    const name = (body.name || '').trim();
    const email = (body.email || '').trim().toLowerCase();
    const category = (body.category || 'software').trim();
    const budgetScope = (body.budgetScope || '').trim();
    const subject = (body.subject || 'Software & Engineering Inquiry').trim();
    const message = (body.message || '').trim();

    // 3. Validation checks
    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please provide your name or organization.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid business or personal email address.' },
        { status: 400 }
      );
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        { success: false, error: 'Please describe your project scope or inquiry with more detail.' },
        { status: 400 }
      );
    }

    const allowedCategories = ['software', 'digital', 'physical', 'collaboration', 'general'];
    const safeCategory = allowedCategories.includes(category) ? category : 'software';

    // 4. Capture telemetry metadata
    const ipAddress =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    // 5. Supabase Insertion
    let inquiryId: string | null = null;

    if (isSupabaseConfigured()) {
      const supabaseServer = getServerSupabase();

      if (supabaseServer) {
        const { data, error } = await supabaseServer
          .from('studio_inquiries')
          .insert([
            {
              name,
              email,
              category: safeCategory,
              budget_scope: budgetScope || null,
              subject,
              message,
              status: 'new',
              ip_address: ipAddress,
              user_agent: userAgent,
            },
          ]);

        if (error) {
          console.error('[Supabase Insert Error]:', error.message);
          return NextResponse.json(
            {
              success: false,
              error: 'Failed to record inquiry in studio database. Please try emailing contact@allin.studio directly.',
            },
            { status: 500 }
          );
        }

        inquiryId = 'submitted';
      }
    } else {
      // In development / before keys are plugged in: simulate safe receipt
      console.log('[Dev Mode] Inquiry simulated (Supabase credentials not yet configured):', {
        name,
        email,
        safeCategory,
        budgetScope,
        subject,
        messagePreview: message.slice(0, 60),
      });
      inquiryId = 'dev-simulated-id';
    }

    // 6. Direct Email Notification to thealnbrand@gmail.com (No Resend / No API key needed)
    try {
      await fetch('https://formsubmit.co/ajax/thealnbrand@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `⚡ [NEW STUDIO LEAD]: ${name} - ${subject}`,
          'Client Name': name,
          'Client Email': email,
          Category: safeCategory,
          Budget: budgetScope || 'Not specified',
          Subject: subject,
          Message: message,
          'Submitted At': new Date().toISOString(),
        }),
      });
    } catch (emailErr) {
      console.warn('[Email Dispatch Warning]:', emailErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry successfully transmitted to ALL IN Studio HQ.',
        inquiryId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Inquiry API Unexpected Error]:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An internal error occurred while processing your dispatch. Please contact us directly.',
      },
      { status: 500 }
    );
  }
}
