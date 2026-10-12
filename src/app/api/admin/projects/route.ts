import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/adminAuth';
import { getServerSupabase } from '@/lib/supabaseClient';

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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
      return NextResponse.json({ projects: [], tableMissing: true });
    }

    return NextResponse.json({ projects: data || [] });
  } catch {
    return NextResponse.json({ projects: [] });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json({ error: 'Database not connected' }, { status: 500 });
  }

  const { data, error } = await supabase
    .from('studio_projects')
    .insert([
      {
        name: body.name,
        category: body.category || '',
        url: body.url || '',
        display_url: body.display_url || body.url || '',
        type_badge: body.type_badge || 'FEATURED LIVE BUILD // SAAS PLATFORM',
        metric1_label: body.metric1_label || 'CREATION SPEED',
        metric1_value: body.metric1_value || 'INSTANT',
        metric1_sub: body.metric1_sub || '1-click generation',
        metric2_label: body.metric2_label || 'AVAILABILITY',
        metric2_value: body.metric2_value || '99.99%',
        metric2_sub: body.metric2_sub || 'Global uptime',
        deliverables: body.deliverables || [],
        sort_order: body.sort_order || 0,
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ project: data });
}

export async function PUT(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { id, ...updates } = body;

  if (!id) {
    return NextResponse.json({ error: 'Missing project ID' }, { status: 400 });
  }

  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json({ error: 'Database not connected' }, { status: 500 });
  }

  const { data, error } = await supabase
    .from('studio_projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ project: data });
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing project ID' }, { status: 400 });
  }

  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json({ error: 'Database not connected' }, { status: 500 });
  }

  const { error } = await supabase
    .from('studio_projects')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
