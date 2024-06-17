import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const GET = async (req: NextRequest) => {
  try {
    const filePath = path.join(process.cwd(), "app/data/teams.json");
    const fileContents = await fs.promises.readFile(filePath, "utf8");
    const data = JSON.parse(fileContents);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error loading data", error },
      { status: 500 }
    );
  }
};
