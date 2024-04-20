import { NextRequest, NextResponse } from "next/server";
import { handleError } from "@/backend/error/error-handler";
import { queryFormatter } from "@/backend/query-formatter";
import { getManyCommentByGame } from "../comment.services";
import { GameCommentQuerySchema } from "../validation";

export async function GET(
  req: NextRequest,
  { params }: { params: { gameId: string } }
) {
  try {
    let queryData = queryFormatter(req);
    queryData.gameId = params.gameId;
    let verifiedData = GameCommentQuerySchema.parse(queryData);
    let comments = await getManyCommentByGame(verifiedData);
    return NextResponse.json({ ...comments });
  } catch (error) {
    return handleError(error);
  }
}
