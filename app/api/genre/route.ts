import { NextRequest, NextResponse } from "next/server";
import { handleError } from "@/backend/error/error-handler";
import { QueryDtoSchema } from "@/backend/dto/query.dto";
import { getManyGenres } from "./genre.services";
import { queryFormatter } from "@/backend/query-formatter";

export async function GET(req: NextRequest) {
  try {
    let queryData = queryFormatter(req);

    let verifiedData = QueryDtoSchema.parse(queryData);
    let genres = await getManyGenres(verifiedData);
    return NextResponse.json({ ...genres });
  } catch (error) {
    return handleError(error);
  }
}
