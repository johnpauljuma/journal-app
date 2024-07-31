import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Define the path to the JSON file
const tasksFilePath = path.join(process.cwd(), 'data', 'dailyTasks.json');

export async function GET() {
  try {
    const data = fs.readFileSync(tasksFilePath, 'utf-8');
    return NextResponse.json(JSON.parse(data), { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const newTask = await request.json();

    let existingTasks = [];
    if (fs.existsSync(tasksFilePath)) {
      const fileData = fs.readFileSync(tasksFilePath, 'utf-8');
      existingTasks = JSON.parse(fileData);
    }

    // Assign unique IDs to new tasks if they don't have one
    if (!newTask.id) {
      newTask.id = uuidv4();
    }

    existingTasks.push(newTask);

    fs.writeFileSync(tasksFilePath, JSON.stringify(existingTasks, null, 2));

    return NextResponse.json({ message: 'Task saved successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error saving task:', error);
    return NextResponse.json({ message: 'Failed to save task' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    let existingTasks = [];
    if (fs.existsSync(tasksFilePath)) {
      const fileData = fs.readFileSync(tasksFilePath, 'utf-8');
      existingTasks = JSON.parse(fileData);
    }

    const updatedTasks = existingTasks.filter(task => task.id !== id);

    fs.writeFileSync(tasksFilePath, JSON.stringify(updatedTasks, null, 2));

    return NextResponse.json({ message: 'Task deleted successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json({ message: 'Failed to delete task' }, { status: 500 });
  }
}
