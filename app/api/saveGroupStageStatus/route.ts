import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function POST(request: Request) {
  try {
    const { groupStageActive, groupStageOver } = await request.json();
    const dataFilePath = path.join(process.cwd(), "app/data/schedules.json");
    const data = JSON.parse(await fs.readFile(dataFilePath, "utf8"));

    data.groupStageActive = groupStageActive;
    data.groupStageOver = groupStageOver;

    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf8");
    return NextResponse.json({
      message: "Group stage status updated successfully",
    });
  } catch (error) {
    console.error(
      "An error occurred while updating group stage status:",
      error
    );
    return NextResponse.json(
      { message: "Failed to update group stage status" },
      { status: 500 }
    );
  }
}
