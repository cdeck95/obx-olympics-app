import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "app/data/schedules.json");

export async function GET(req: NextRequest) {
  try {
    const data = await fs.promises.readFile(dataFilePath, "utf8");
    const schedules = JSON.parse(data);
    return NextResponse.json(schedules);
  } catch (error: any) {
    console.error("Failed to load schedules", error);
    return NextResponse.json(
      { message: "Failed to load schedules" },
      { status: 500 }
    );
  }
}
