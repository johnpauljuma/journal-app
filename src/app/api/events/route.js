import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const tasksFilePath = path.join(process.cwd(), 'data', 'events.json');

export async function GET() {
  try {
    if (fs.existsSync(tasksFilePath)) {
      const data = fs.readFileSync(tasksFilePath, 'utf-8');
      return NextResponse.json(JSON.parse(data), { status: 200 });
    } else {
      return NextResponse.json({}, { status: 200 }); // Return an empty object if file doesn't exist
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ message: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const newEvent = await request.json();

    let existingEvents = {};
    if (fs.existsSync(tasksFilePath)) {
      const fileData = fs.readFileSync(tasksFilePath, 'utf-8');
      existingEvents = JSON.parse(fileData);
    }

    const date = newEvent.date;
    newEvent.id = uuidv4();

    if (!existingEvents[date]) {
      existingEvents[date] = [];
    }

    existingEvents[date].push(newEvent);
    fs.writeFileSync(tasksFilePath, JSON.stringify(existingEvents, null, 2));

    return NextResponse.json({ message: 'Event saved successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error saving event:', error);
    return NextResponse.json({ message: 'Failed to save event' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id, date } = await request.json();

    let existingEvents = {};
    if (fs.existsSync(tasksFilePath)) {
      const fileData = fs.readFileSync(tasksFilePath, 'utf-8');
      existingEvents = JSON.parse(fileData);
    }

    if (existingEvents[date]) {
      existingEvents[date] = existingEvents[date].filter(event => event.id !== id);
      if (existingEvents[date].length === 0) {
        delete existingEvents[date];
      }
    }

    fs.writeFileSync(tasksFilePath, JSON.stringify(existingEvents, null, 2));
    return NextResponse.json({ message: 'Event deleted successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json({ message: 'Failed to delete event' }, { status: 500 });
  }
}
