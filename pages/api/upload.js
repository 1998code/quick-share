import * as vercelBlob from '@vercel/blob';

export async function POST(request) {
  const form = await request.formData();
  const file = form.get('file');

  if (!file) {
    return NextResponse.json(
      { message: 'No file to upload.' },
      { status: 400 },
    );
  }

  const blob = await vercelBlob.put(file.name, file, { access: 'public' });

  return NextResponse.json(blob);
}