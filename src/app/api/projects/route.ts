import { NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabaseClient';

export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json({ projects: [] });
  }

  try {
    const { data, error } = await supabase
      .from('studio_projects')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      return NextResponse.json({ projects: [], error: error.message });
    }

    return NextResponse.json({ projects: data || [] });
  } catch (err: any) {
    return NextResponse.json({ projects: [], error: err?.message || 'Server error' });
  }
}
