import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { getPresignedUploadUrl } from '@/lib/r2';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  await requireAdmin();

  let body: { filename?: string; contentType?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  if (!body.filename || !body.contentType) {
    return NextResponse.json(
      { error: 'filename and contentType are required.' },
      { status: 400 },
    );
  }

  if (!body.contentType.startsWith('image/')) {
    return NextResponse.json(
      { error: 'Only image uploads are allowed.' },
      { status: 400 },
    );
  }

  try {
    const result = await getPresignedUploadUrl({
      filename: body.filename,
      contentType: body.contentType,
    });
    return NextResponse.json(result);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
