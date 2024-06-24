// const { put } = require("@vercel/blob");
// const fs = require("fs");
// const path = require("path");

// const schedulesBlobPath = "schedules.json";
// const localFilePath = path.join(__dirname, "schedules.json");

// async function uploadSchedules() {
//   try {
//     // Read the local file
//     const fileContents = fs.readFileSync(localFilePath, "utf8");

//     // Upload to Vercel Blob
//     const blob = await put(schedulesBlobPath, fileContents, {
//       access: "public",
//       contentType: "application/json",
//     });

//     console.log("File uploaded successfully:", blob.url);
//   } catch (error) {
//     console.error("Failed to upload file:", error);
//   }
// }

// uploadSchedules();

//uploadSchedules/route.ts

// import { NextRequest, NextResponse } from "next/server";
// import { put, head } from "@vercel/blob";
// import fs from "fs/promises";
// import path from "path";

// const localFilePath = path.join(process.cwd(), "app/data/schedules.json");

// export async function GET(req: NextRequest) {
//   console.log("GET request received");
//   try {
//     // Read the local file
//     const fileContents = await fs.readFile(localFilePath, "utf8");
//     console.log("File read successfully");

//     // Upload to Vercel Blob
//     const blob = await put("schedules.json", fileContents, {
//       access: "public",
//       contentType: "application/json",
//       addRandomSuffix: false,
//     });
//     console.log("File uploaded successfully");

//     return NextResponse.json({ url: blob.url });
//   } catch (error: any) {
//     console.error("Failed to upload file:", error);
//     return NextResponse.json(
//       { message: "Failed to upload file", error },
//       { status: 500 }
//     );
//   }
// }
