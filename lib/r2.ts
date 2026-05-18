import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export function r2Client() {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error(
      'R2 credentials missing. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY.',
    );
  }

  return new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
}

export function r2Bucket(): string {
  const bucket = process.env.R2_BUCKET_NAME ?? process.env.R2_BUCKET;
  if (!bucket) throw new Error('R2_BUCKET_NAME env var missing.');
  return bucket;
}

export function r2PublicUrl(key: string): string {
  const base = process.env.R2_PUBLIC_BASE_URL ?? process.env.R2_PUBLIC_URL;
  if (!base) throw new Error('R2_PUBLIC_BASE_URL env var missing.');
  return `${base.replace(/\/$/, '')}/${key}`;
}

/**
 * Generate a presigned PUT URL the browser can upload directly to.
 * Caller gets back { uploadUrl, publicUrl, key } — store publicUrl on the row.
 */
export async function getPresignedUploadUrl(opts: {
  filename: string;
  contentType: string;
  prefix?: string;
}): Promise<{ uploadUrl: string; publicUrl: string; key: string }> {
  const ext = opts.filename.split('.').pop() ?? 'bin';
  const safeName = opts.filename
    .replace(/\.[^.]+$/, '')
    .replace(/[^A-Za-z0-9_-]/g, '-')
    .slice(0, 60);
  const key = `${opts.prefix ?? 'products'}/${Date.now()}-${safeName}.${ext}`;

  const command = new PutObjectCommand({
    Bucket: r2Bucket(),
    Key: key,
    ContentType: opts.contentType,
  });

  const uploadUrl = await getSignedUrl(r2Client(), command, { expiresIn: 60 * 5 });

  return { uploadUrl, publicUrl: r2PublicUrl(key), key };
}

export async function deleteR2Object(key: string): Promise<void> {
  await r2Client().send(
    new DeleteObjectCommand({ Bucket: r2Bucket(), Key: key }),
  );
}

/** Extract the R2 key from a public URL we previously wrote. Returns null if it doesn't match. */
export function r2KeyFromUrl(url: string): string | null {
  const base = process.env.R2_PUBLIC_BASE_URL ?? process.env.R2_PUBLIC_URL;
  if (!base) return null;
  const normalized = base.replace(/\/$/, '');
  if (!url.startsWith(normalized + '/')) return null;
  return url.slice(normalized.length + 1);
}
