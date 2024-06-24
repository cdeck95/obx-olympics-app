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
