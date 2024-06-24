import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function POST(request: Request) {
  try {
    const updatedSchedule = await request.json();
    const dataFilePath = path.join(process.cwd(), "app/data/schedules.json");

    // Log received data for debugging
    console.log("Received schedule data:", updatedSchedule);

    for (let i = 0; i < updatedSchedule.schedule.length; i++) {
      console.log(updatedSchedule.schedule[i].matches);
    }

    // Read the existing data
    const data = JSON.parse(await fs.readFile(dataFilePath, "utf8"));

    // Log existing data for debugging
    console.log("Existing schedule data:", data);

    // Update the full schedule data
    data.schedule = updatedSchedule.schedule;
    data.groupStageActive = updatedSchedule.groupStageActive;
    data.groupStageOver = updatedSchedule.groupStageOver;

    // Log updated data for debugging
    console.log("Updated schedule data:", data);

    for (let i = 0; i < data.schedule.length; i++) {
      console.log(data.schedule[i].matches);
    }

    console.log("about to write file");

    // Write the updated data back to the file
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf8");

    console.log("file written");

    return NextResponse.json({
      message: "Schedules saved successfully",
    });
  } catch (error: any) {
    console.error("An error occurred while saving schedules:", error);
    console.log(error.message);
    return NextResponse.json(
      { message: "Failed to save schedules: " + error },
      { status: 500 }
    );
  }
}
