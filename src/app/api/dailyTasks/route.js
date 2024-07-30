import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const tasksFilePath = path.join(process.cwd(), 'data', 'dailyTasks.json');

export async function POST(request) {
  try {
    const tasks = await request.json();

    let existingTasks = [];
    if (fs.existsSync(tasksFilePath)) {
      const fileData = fs.readFileSync(tasksFilePath, 'utf-8');
      existingTasks = JSON.parse(fileData);
    }

    existingTasks = [...existingTasks, ...tasks];

    fs.writeFileSync(tasksFilePath, JSON.stringify(existingTasks, null, 2));

    return NextResponse.json({ message: 'Tasks saved successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error saving tasks:', error);
    return NextResponse.json({ message: 'Failed to save tasks' }, { status: 500 });
  }
}
