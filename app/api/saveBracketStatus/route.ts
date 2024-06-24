import { NextResponse } from "next/server";
import { list, put } from "@vercel/blob";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // List the blobs to find the unique URL for the 'schedules.json'
    const { blobs } = await list();
    const scheduleBlob = blobs.find((blob) =>
      blob.pathname.startsWith("schedules.json")
    );

    if (!scheduleBlob) {
      throw new Error("schedules.json not found");
    }

    const blobUrl = `${scheduleBlob.url}?timestamp=${Date.now()}`;

    // Fetch the existing data from the blob
    const response = await fetch(blobUrl);
    const existingData = await response.json();

    // Update the bracketMatches and bracketPlayLive fields in the existing data
    existingData.bracketMatches = data.bracketMatches;
    existingData.bracketPlayLive = data.bracketPlayLive;
    existingData.bracketPlayOver = data.bracketPlayOver;

    // Upload the updated data back to the blob without adding a random suffix
    await put("schedules.json", JSON.stringify(existingData), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
    });

    return NextResponse.json({
      message: "Bracket status updated successfully",
    });
  } catch (error: any) {
    console.error("Error saving data:", error);
    return NextResponse.json({ message: "Error saving data" }, { status: 500 });
  }
}
