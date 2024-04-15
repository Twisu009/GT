import { NextRequest, NextResponse } from "next/server";
import { handleError } from "@/backend/error/error-handler";
import { getUserAuthData } from "../../../auth/auth.services";
import { CreateGameRatingSchema } from "../../validation";
import { addGameRating } from "../../games.services";

export async function POST(req: NextRequest) {
  try {
    let user = getUserAuthData(req);
    const data = await req.json();
    data.userId = user.userId;
    let verifiedData = CreateGameRatingSchema.parse(data);
    let rating = await addGameRating(verifiedData);
    return NextResponse.json({ rating });
  } catch (error) {
    return handleError(error);
  }
}
