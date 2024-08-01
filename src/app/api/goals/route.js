import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const goalsFilePath = path.join(process.cwd(), 'data', 'goals.json');

export async function GET() {
  try {
    // Read the JSON file
    const data = await fs.promises.readFile(goalsFilePath, 'utf-8');
    const goals = JSON.parse(data);

    // Count achieved and not achieved goals
    const counts = goals.reduce((acc, goal) => {
      if (goal.achieved === true) {
        acc.achievedGoals += 1;
      } else {
        acc.notAchievedGoals += 1;
      }
      return acc;
    }, { achievedGoals: 0, notAchievedGoals: 0 });

    // Return the counts as JSON response
    return NextResponse.json(counts, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return NextResponse.json({ message: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const goal = { ...body, id: uuidv4() };

    let goalsData = [];
    if (fs.existsSync(goalsFilePath)) {
      const fileData = fs.readFileSync(goalsFilePath, 'utf-8');
      goalsData = JSON.parse(fileData);
    }

    goalsData.push(goal);
    fs.writeFileSync(goalsFilePath, JSON.stringify(goalsData, null, 2));

    return NextResponse.json({ message: 'Goal saved successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error saving goal:', error);
    return NextResponse.json({ message: 'Failed to save goal' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json({ message: 'Invalid goal ID' }, { status: 400 });
    }

    let goalsData = [];
    if (fs.existsSync(goalsFilePath)) {
      const fileData = fs.readFileSync(goalsFilePath, 'utf-8');
      goalsData = JSON.parse(fileData);
    }

    const goalIndex = goalsData.findIndex(goal => goal.id === body.id);
    if (goalIndex !== -1) {
      goalsData[goalIndex] = body;
      fs.writeFileSync(goalsFilePath, JSON.stringify(goalsData, null, 2));
      return NextResponse.json({ message: 'Goal updated successfully!' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Goal not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error updating goal:', error);
    return NextResponse.json({ message: 'Failed to update goal' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ message: 'Invalid goal ID' }, { status: 400 });
    }

    let goalsData = [];
    if (fs.existsSync(goalsFilePath)) {
      const fileData = fs.readFileSync(goalsFilePath, 'utf-8');
      goalsData = JSON.parse(fileData);
    }

    goalsData = goalsData.filter(goal => goal.id !== id);
    fs.writeFileSync(goalsFilePath, JSON.stringify(goalsData, null, 2));

    return NextResponse.json({ message: 'Goal deleted successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting goal:', error);
    return NextResponse.json({ message: 'Failed to delete goal' }, { status: 500 });
  }
}
