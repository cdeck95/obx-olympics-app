import { NextRequest, NextResponse } from "next/server";
import { put, head } from "@vercel/blob";
import fs from "fs/promises";
import path from "path";

const localFilePath = path.join(process.cwd(), "app/data/schedules.json");

export async function GET(req: NextRequest) {
  console.log("GET request received");
  try {
    // Read the local file
    const fileContents = await fs.readFile(localFilePath, "utf8");
    console.log("File read successfully");

    // Upload to Vercel Blob
    const blob = await put("schedules.json", fileContents, {
      access: "public",
      contentType: "application/json",
    });
    console.log("File uploaded successfully");

    return NextResponse.json({ url: blob.url });
  } catch (error: any) {
    console.error("Failed to upload file:", error);
    return NextResponse.json(
      { message: "Failed to upload file", error },
      { status: 500 }
    );
  }
}
