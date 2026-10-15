import { NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json({ goods: [] });
  }

  try {
    const { data, error } = await supabase
      .from('studio_goods')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      return NextResponse.json({ goods: [], error: error.message });
    }

    return NextResponse.json({ goods: data || [] });
  } catch (err: any) {
    return NextResponse.json({ goods: [], error: err?.message || 'Server error' });
  }
}
