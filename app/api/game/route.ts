import { NextRequest, NextResponse } from "next/server";
import { handleError } from "@/backend/error/error-handler";
import { QueryDtoSchema } from "@/backend/dto/query.dto";
import { getManyGames } from "./games.services";
import { queryFormatter } from "@/backend/query-formatter";
import { GameQuerySchema } from "./validation";

export async function GET(req: NextRequest) {
  try {
    let queryData = queryFormatter(req);
    let verifiedData = GameQuerySchema.parse(queryData);
    let games = await getManyGames(verifiedData);
    return NextResponse.json({ ...games });
  } catch (error) {
    return handleError(error);
  }
}
