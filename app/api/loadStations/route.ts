import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function GET() {
  try {
    const dataFilePath = path.join(process.cwd(), "app/data/stations.json");
    const data = await fs.readFile(dataFilePath, "utf8");
    const parsedData = JSON.parse(data);
    const stations = parsedData.stations;
    return NextResponse.json({ stations });
  } catch (error) {
    console.error("Error loading stations:", error);
    return NextResponse.json(
      { error: "Error loading stations" },
      { status: 500 }
    );
  }
}
