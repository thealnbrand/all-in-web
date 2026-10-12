import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/adminAuth';
import { getServerSupabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ inquiries: [] });
  }

  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json({ inquiries: [] });
  }

  const { data, error } = await supabase
    .from('studio_inquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[Admin Inquiries Fetch Error]:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ inquiries: data || [] });
}

export async function PATCH(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { id, status } = body;

  if (!id || !status) {
    return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
  }

  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  const { error } = await supabase
    .from('studio_inquiries')
    .update({ status })
    .eq('id', id);

  if (error) {
    console.error('[Admin Inquiry Update Error]:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  const { error } = await supabase
    .from('studio_inquiries')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('[Admin Inquiry Delete Error]:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
