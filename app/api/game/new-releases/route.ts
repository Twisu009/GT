import { NextRequest, NextResponse } from "next/server";
import { handleError } from "@/backend/error/error-handler";
import { getNewReleasesGames } from "../games.services";

export async function GET(req: NextRequest) {
  try {
    let games = await getNewReleasesGames();
    return NextResponse.json({ ...games });
  } catch (error) {
    return handleError(error);
  }
}
