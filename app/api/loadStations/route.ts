import { NextRequest, NextResponse } from "next/server";
import { list } from "@vercel/blob";

export async function GET(req: NextRequest) {
  try {
    // List the blobs to find the unique URL for the 'stations.json'
    const { blobs } = await list();
    const stationsBlob = blobs.find((blob) =>
      blob.pathname.startsWith("stations.json")
    );

    if (!stationsBlob) {
      throw new Error("stations.json not found");
    }

    const blobUrl = stationsBlob.url;

    // Add a cache-busting query parameter
    const cacheBustingUrl = `${blobUrl}?timestamp=${Date.now()}`;

    // Fetch the actual content of the blob
    const response = await fetch(cacheBustingUrl, { cache: "no-store" });
    const parsedData = await response.json();
    const stations = parsedData.stations;

    // Return the stations data
    return NextResponse.json({ stations });
  } catch (error: any) {
    console.error("Error loading stations:", error);
    return NextResponse.json(
      { error: "Error loading stations" },
      { status: 500 }
    );
  }
}
