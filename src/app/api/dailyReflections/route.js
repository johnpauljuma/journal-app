import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, date, description, imagePath } = body;

    const reflection = {
      id: uuidv4(),
      title,
      date,
      description,
      imagePath,
    };

    const reflectionsFilePath = path.join(process.cwd(), 'data', 'reflections.json');
    let reflections = [];

    if (fs.existsSync(reflectionsFilePath)) {
      reflections = JSON.parse(fs.readFileSync(reflectionsFilePath));
    }

    reflections.push(reflection);
    fs.writeFileSync(reflectionsFilePath, JSON.stringify(reflections, null, 2));

    return NextResponse.json({ message: 'Reflection submitted successfully', reflection }, { status: 200 });
  } catch (error) {
    console.error('Error handling the form submission:', error);
    return NextResponse.json({ message: 'Submission failed', error: error.message }, { status: 500 });
  }
}
