import { NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabaseClient';

export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json({ products: [] });
  }

  try {
    const { data, error } = await supabase
      .from('studio_products')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      return NextResponse.json({ products: [], error: error.message });
    }

    return NextResponse.json({ products: data || [] });
  } catch (err: any) {
    return NextResponse.json({ products: [], error: err?.message || 'Server error' });
  }
}
