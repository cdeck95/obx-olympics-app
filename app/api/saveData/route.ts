import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const filePath = path.join(
      process.cwd(),
      "app",
      "data",
      "bracketData.json"
    );

    fs.writeFileSync(filePath, JSON.stringify(data), "utf8");

    return NextResponse.json({ message: "Data saved successfully" });
  } catch (err) {
    console.error("Error saving data:", err);
    return NextResponse.json({ message: "Error saving data" }, { status: 500 });
  }
}
