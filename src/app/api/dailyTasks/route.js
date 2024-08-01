import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const tasksFilePath = path.join(process.cwd(), 'data', 'dailyTasks.json');

// Helper function to ensure tasks are stored as a flat array
const flattenTasksArray = (tasks) => {
  return tasks.reduce((acc, task) => acc.concat(task), []);
};

export async function GET() {
  try {
    if (fs.existsSync(tasksFilePath)) {
      let data = fs.readFileSync(tasksFilePath, 'utf-8');
      let tasks = JSON.parse(data);

      tasks = flattenTasksArray(tasks); // Flatten the array if necessary

      console.log("Tasks fetched:", tasks);
      return NextResponse.json(tasks, { status: 200 });
    } else {
      return NextResponse.json([], { status: 200 }); // Return an empty array if file doesn't exist
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
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

    existingTasks = flattenTasksArray(existingTasks); // Ensure tasks are flattened

    newTask.id = newTask.id || uuidv4(); // Ensure ID is set
    existingTasks.push(newTask);
    fs.writeFileSync(tasksFilePath, JSON.stringify(existingTasks, null, 2));

    console.log("Task saved:", newTask);
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

    existingTasks = flattenTasksArray(existingTasks); // Ensure tasks are flattened

    const updatedTasks = existingTasks.filter(task => task.id !== id);
    fs.writeFileSync(tasksFilePath, JSON.stringify(updatedTasks, null, 2));

    console.log("Task deleted:", id);
    return NextResponse.json({ message: 'Task deleted successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json({ message: 'Failed to delete task' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const updatedTask = await request.json();

    if (!updatedTask.id) {
      return NextResponse.json({ message: 'Invalid task ID' }, { status: 400 });
    }

    if (fs.existsSync(tasksFilePath)) {
      const data = fs.readFileSync(tasksFilePath, 'utf-8');
      let existingTasks = JSON.parse(data);

      existingTasks = flattenTasksArray(existingTasks); // Ensure tasks are flattened

      const index = existingTasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        existingTasks[index] = updatedTask;
        fs.writeFileSync(tasksFilePath, JSON.stringify(existingTasks, null, 2));
        console.log("Task updated:", updatedTask);
        return NextResponse.json({ message: 'Task updated successfully!' }, { status: 200 });
      } else {
        return NextResponse.json({ message: 'Task not found' }, { status: 404 });
      }
    } else {
      return NextResponse.json({ message: 'No tasks found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json({ message: 'Failed to update task' }, { status: 500 });
  }
}
