import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function POST(request: Request) {
  try {
    const schedules = await request.json();
    const dataFilePath = path.join(process.cwd(), "app/data/schedules.json");
    const data = JSON.stringify(schedules, null, 2);
    await fs.writeFile(dataFilePath, data, "utf8");
    return NextResponse.json({ message: "Schedules saved successfully" });
  } catch (error) {
    console.error("An error occurred while saving schedules:", error);
    return NextResponse.json(
      { message: "Failed to save schedules" },
      { status: 500 }
    );
  }
}
