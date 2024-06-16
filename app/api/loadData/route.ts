import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "app", "data", "bracketData.json");

  try {
    console.log("Loading data from:", filePath);
    const data = fs.readFileSync(filePath, "utf8");
    console.log("Data loaded successfully");
    console.log("Data:", data);

    const jsonData = JSON.parse(data);
    console.log("Parsed data:", jsonData);

    // Validate the data format
    if (jsonData && typeof jsonData === "object" && "mainBracket" in jsonData) {
      return NextResponse.json(jsonData);
    } else {
      console.error("Invalid data format:", jsonData);
      throw new Error("Invalid data format");
    }
  } catch (err: any) {
    if (err.code === "ENOENT") {
      // File not found, return default data
      console.log("File not found, returning default data");
      return NextResponse.json({ playInMatch: null, mainBracket: [] });
    }

    console.error("Error loading data:", err);
    return NextResponse.json(
      { message: "Error loading data" },
      { status: 500 }
    );
  }
}
