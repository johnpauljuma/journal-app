import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const uploadDir = path.join(process.cwd(), 'public', 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get('file');

    if (!file) {
      return NextResponse.json({ message: 'Upload an Image' }, { status: 400 });
    }

    const filePath = path.join(uploadDir, file.name);
    const fileStream = fs.createWriteStream(filePath);

    const buffer = Buffer.from(await file.arrayBuffer());
    fileStream.write(buffer);
    fileStream.end();

    return NextResponse.json({ message: 'File uploaded successfully', filePath: `/uploads/${file.name}` }, { status: 200 });
  } catch (error) {
    console.error('Error handling the file upload:', error);
    return NextResponse.json({ message: 'File upload failed', error: error.message }, { status: 500 });
  }
}
