import { NextResponse } from "next/server";
import { list, put } from "@vercel/blob";

export async function POST(request: Request) {
  try {
    const updatedSchedule = await request.json();

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
    const data = await response.json();

    // Update the full schedule data
    data.schedule = updatedSchedule.schedule;
    data.groupStageActive = updatedSchedule.groupStageActive;
    data.groupStageOver = updatedSchedule.groupStageOver;

    // Upload the updated data back to the blob without adding a random suffix
    await put("schedules.json", JSON.stringify(data), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
    });

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
