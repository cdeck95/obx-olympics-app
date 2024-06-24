import { NextRequest, NextResponse } from "next/server";
import { list } from "@vercel/blob";

export async function GET(req: NextRequest) {
  try {
    // List the blobs to find the unique URL for the 'schedules.json'
    const { blobs } = await list();
    const scheduleBlob = blobs.find((blob) =>
      blob.pathname.startsWith("schedules.json")
    );

    if (!scheduleBlob) {
      throw new Error("schedules.json not found");
    }

    const blobUrl = scheduleBlob.url;

    // Add a cache-busting query parameter
    const cacheBustingUrl = `${blobUrl}?timestamp=${Date.now()}`;

    // Fetch the actual content of the blob
    const response = await fetch(cacheBustingUrl, { cache: "no-store" });
    const schedules = await response.json();

    // Return the schedules data
    return NextResponse.json(schedules);
  } catch (error: any) {
    console.error("Failed to load schedules", error);
    return NextResponse.json(
      { message: "Failed to load schedules" },
      { status: 500 }
    );
  }
}
