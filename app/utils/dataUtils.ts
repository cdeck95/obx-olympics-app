import fs from "fs";
import path from "path";

export const saveDataUtil = async (data: any) => {
  try {
    console.log("Saving data:", data);
    const response = await fetch("/api/saveBracketStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("Response:", response);

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error("Error saving data:", errorDetails);
      throw new Error(
        `Error saving data: ${response.status} ${response.statusText}`
      );
    }
    console.log("Data saved successfully");
  } catch (error) {
    console.error("An error occurred while saving data:", error);
    throw error;
  }
};
