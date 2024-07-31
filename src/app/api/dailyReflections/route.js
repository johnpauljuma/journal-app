import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';

const reflectionsFilePath = path.join(process.cwd(), 'data', 'reflections.json');

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

export async function GET() {
  try {
    let reflections = [];

    if (fs.existsSync(reflectionsFilePath)) {
      reflections = JSON.parse(fs.readFileSync(reflectionsFilePath, 'utf8'));
    }

    return NextResponse.json(reflections, { status: 200 });
  } catch (error) {
    console.error('Error fetching the diaries:', error);
    return NextResponse.json({ message: 'Failed to fetch diaries', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json(); // Assuming the ID is sent in the request body

    let reflections = [];
    if (fs.existsSync(reflectionsFilePath)) {
      reflections = JSON.parse(fs.readFileSync(reflectionsFilePath));
    }

    const newReflections = reflections.filter(reflection => reflection.id !== id);
    fs.writeFileSync(reflectionsFilePath, JSON.stringify(newReflections, null, 2));

    return NextResponse.json({ message: 'Reflection deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting the reflection:', error);
    return NextResponse.json({ message: 'Deletion failed', error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const { id, title, date, description, imagePath } = await req.json();
    let reflections = [];

    if (fs.existsSync(reflectionsFilePath)) {
      reflections = JSON.parse(fs.readFileSync(reflectionsFilePath));
    }

    const index = reflections.findIndex(reflection => reflection.id === id);
    if (index !== -1) {
      reflections[index] = { id, title, date, description, imagePath };
      fs.writeFileSync(reflectionsFilePath, JSON.stringify(reflections, null, 2));
      return NextResponse.json({ message: 'Reflection updated successfully' }, { status: 200 });
    }

    return NextResponse.json({ message: 'Reflection not found' }, { status: 404 });
  } catch (error) {
    console.error('Error updating the reflection:', error);
    return NextResponse.json({ message: 'Update failed', error: error.message }, { status: 500 });
  }
}
