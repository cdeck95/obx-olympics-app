import { NextResponse } from "next/server";
import { list, put } from "@vercel/blob";

export async function POST(request: Request) {
  try {
    const { groupStageActive, groupStageOver } = await request.json();

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

    // Update the groupStageActive and groupStageOver fields in the existing data
    data.groupStageActive = groupStageActive;
    data.groupStageOver = groupStageOver;

    // Upload the updated data back to the blob without adding a random suffix
    await put("schedules.json", JSON.stringify(data), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
    });

    return NextResponse.json({
      message: "Group stage status updated successfully",
    });
  } catch (error: any) {
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
