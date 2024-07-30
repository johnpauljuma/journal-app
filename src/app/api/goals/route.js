import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define the path to the JSON file
const goalsFilePath = path.join(process.cwd(), 'data', 'goals.json');

export async function POST(request) {
  try {
    // Parse the incoming request body
    const body = await request.json();

    // Read existing data from the JSON file
    let goalsData = [];
    if (fs.existsSync(goalsFilePath)) {
      const fileData = fs.readFileSync(goalsFilePath, 'utf-8');
      goalsData = JSON.parse(fileData);
    }

    // Add the new goal to the data
    goalsData.push(body);

    // Write the updated data back to the JSON file
    fs.writeFileSync(goalsFilePath, JSON.stringify(goalsData, null, 2));

    // Return a success response
    return NextResponse.json({ message: 'Goal saved successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error saving goal:', error);
    return NextResponse.json({ message: 'Failed to save goal' }, { status: 500 });
  }
}
