import fs from "fs";
import path from "path";

export const saveDataUtil = async (data: any) => {
  try {
    const response = await fetch("/api/saveBracketStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

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

export const loadDataUtil = async () => {
  try {
    const response = await fetch("/api/loadData");
    if (!response.ok) {
      const errorDetails = await response.text();
      console.error("Error loading data:", errorDetails);
      throw new Error(
        `Error loading data: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    console.log("Data loaded successfully:", data);
    return data;
  } catch (error) {
    console.error("An error occurred while loading data:", error);
    throw error;
  }
};
