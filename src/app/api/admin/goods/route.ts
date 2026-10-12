import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/adminAuth';
import { getServerSupabase } from '@/lib/supabaseClient';

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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
      return NextResponse.json({ goods: [], tableMissing: true });
    }

    return NextResponse.json({ goods: data || [] });
  } catch {
    return NextResponse.json({ goods: [] });
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
    .from('studio_goods')
    .insert([
      {
        name: body.name,
        status: body.status || 'STUDIO GRAPHIC EDITION // ON-DEMAND DISPATCH',
        badge: body.badge || 'STUDIO GRAPHIC EDITION',
        price_tag: body.price_tag || '$160.00 USD',
        image: body.image || '/TactileGoods.jfif',
        ...(body.secondary_image ? { secondary_image: body.secondary_image } : {}),
        description: body.description || '',
        materials: body.materials || 'Curated Heavyweight Streetwear Cotton / DTG Print',
        url: body.url || 'https://chillguyso.etsy.com',
        sort_order: body.sort_order || 0,
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ item: data });
}

export async function PUT(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { id, ...updates } = body;

  if (!id) {
    return NextResponse.json({ error: 'Missing item ID' }, { status: 400 });
  }

  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json({ error: 'Database not connected' }, { status: 500 });
  }

  const { data, error } = await supabase
    .from('studio_goods')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ item: data });
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing item ID' }, { status: 400 });
  }

  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json({ error: 'Database not connected' }, { status: 500 });
  }

  const { error } = await supabase
    .from('studio_goods')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
