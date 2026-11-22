import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/adminAuth';
import { getServerSupabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ subscribers: [] });
  }

  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json({ subscribers: [] });
  }

  const { data, error } = await supabase
    .from('studio_subscribers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[Admin Subscribers Fetch Error]:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ subscribers: data || [] });
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: 'Missing subscriber id' }, { status: 400 });
  }

  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  const { error } = await supabase
    .from('studio_subscribers')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('[Admin Subscriber Delete Error]:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
