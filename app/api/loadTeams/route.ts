import { NextRequest, NextResponse } from "next/server";
import { list } from "@vercel/blob";

export async function GET(req: NextRequest) {
  try {
    // List the blobs to find the unique URL for the 'teams.json'
    const { blobs } = await list();
    const teamsBlob = blobs.find((blob) =>
      blob.pathname.startsWith("teams.json")
    );

    if (!teamsBlob) {
      throw new Error("teams.json not found");
    }

    const blobUrl = teamsBlob.url;

    // Add a cache-busting query parameter
    const cacheBustingUrl = `${blobUrl}?timestamp=${Date.now()}`;

    // Fetch the actual content of the blob
    const response = await fetch(cacheBustingUrl, { cache: "no-store" });
    const data = await response.json();

    // Return the teams data
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error loading data:", error);
    return NextResponse.json(
      { message: "Error loading data", error },
      { status: 500 }
    );
  }
}
