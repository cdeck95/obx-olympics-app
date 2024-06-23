import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("Received data:", data);
    const filePath = path.join(process.cwd(), "app", "data", "schedules.json");
    console.log("File path:", filePath);

    // Read existing data from the schedules.json file
    const existingData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    console.log("Existing data:", existingData);

    // Update the bracketMatches and bracketPlayLive fields in the existing data
    existingData.bracketMatches = data.bracketMatches;
    existingData.bracketPlayLive = data.bracketPlayLive;
    existingData.bracketPlayOver = data.bracketPlayOver;

    // Write the updated data back to the schedules.json file
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), "utf8");

    return NextResponse.json({
      message: "Bracket status updated successfully",
    });
  } catch (err) {
    console.error("Error saving data:", err);
    return NextResponse.json({ message: "Error saving data" }, { status: 500 });
  }
}
