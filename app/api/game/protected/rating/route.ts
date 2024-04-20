import { NextRequest, NextResponse } from "next/server";
import { handleError } from "@/backend/error/error-handler";
import { getUserAuthData } from "../../../auth/auth.services";
import { CreateGameRatingSchema, GameRatingUserSchema } from "../../validation";
import { addGameRating, getGameRatingByUser } from "../../games.services";
import { queryFormatter } from "@/backend/query-formatter";

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

export async function GET(req: NextRequest) {
  try {
    let user = getUserAuthData(req);
    let queryData = queryFormatter(req);
    queryData["userId"] = `${user.userId}`;
    let verifiedData = GameRatingUserSchema.parse(queryData);
    let rating = await getGameRatingByUser(verifiedData);
    return NextResponse.json({ rating });
  } catch (error) {
    return handleError(error);
  }
}
