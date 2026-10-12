import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/adminAuth';
import { getServerSupabase } from '@/lib/supabaseClient';

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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
      // If table doesn't exist yet, return empty list gracefully
      return NextResponse.json({ products: [], tableMissing: true });
    }

    return NextResponse.json({ products: data || [] });
  } catch {
    return NextResponse.json({ products: [] });
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
    .from('studio_products')
    .insert([
      {
        name: body.name,
        status: body.status || 'LIVE ON GUMROAD',
        badge: body.badge || 'DIGITAL ASSET',
        image: body.image || 'https://chillguystore.gumroad.com',
        tagline: body.tagline || '',
        description: body.description || '',
        stack: body.stack || '',
        access: body.access || '',
        price_tag: body.price_tag || '',
        url: body.url || '',
        sort_order: body.sort_order || 0,
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ product: data });
}

export async function PUT(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { id, ...updates } = body;

  if (!id) {
    return NextResponse.json({ error: 'Missing product ID' }, { status: 400 });
  }

  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json({ error: 'Database not connected' }, { status: 500 });
  }

  const { data, error } = await supabase
    .from('studio_products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ product: data });
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing product ID' }, { status: 400 });
  }

  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json({ error: 'Database not connected' }, { status: 500 });
  }

  const { error } = await supabase
    .from('studio_products')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
