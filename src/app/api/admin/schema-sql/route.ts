import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const schemaPath = path.join(process.cwd(), 'supabase', 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      const sql = fs.readFileSync(schemaPath, 'utf8');
      return NextResponse.json({ sql });
    }
    return NextResponse.json({ sql: '' });
  } catch {
    return NextResponse.json({ sql: '' });
  }
}
