import { NextRequest, NextResponse } from "next/server";
import { handleError } from "@/backend/error/error-handler";
import { QueryDtoSchema } from "@/backend/dto/query.dto";
import { queryFormatter } from "@/backend/query-formatter";
import { GameRatingQuerySchema } from "../validation";
import { getGameRating } from "../games.services";

export async function GET(req: NextRequest) {
  try {
    let queryData = queryFormatter(req);
    let verifiedData = GameRatingQuerySchema.parse(queryData);
    let ratings = await getGameRating(verifiedData);
    return NextResponse.json({ ratings });
  } catch (error) {
    return handleError(error);
  }
}
