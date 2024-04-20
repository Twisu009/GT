import { NextRequest, NextResponse } from "next/server";
import { handleError } from "@/backend/error/error-handler";
import { QueryDtoSchema } from "@/backend/dto/query.dto";
import { queryFormatter } from "@/backend/query-formatter";
import { UserQuerySchema } from "./validation";
import { getManyUsers } from "./user.services";

export async function GET(req: NextRequest) {
  try {
    let queryData = queryFormatter(req);
    let verifiedData = UserQuerySchema.parse(queryData);
    let users = await getManyUsers(verifiedData);
    return NextResponse.json({ ...users });
  } catch (error) {
    return handleError(error);
  }
}
