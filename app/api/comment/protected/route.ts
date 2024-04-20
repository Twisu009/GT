import { NextRequest, NextResponse } from "next/server";
import { handleError } from "@/backend/error/error-handler";
import { getUserAuthData } from "../../auth/auth.services";
import { CreateCommentSchema } from "../validation";
import { createComment } from "../comment.services";

export async function POST(req: NextRequest) {
  try {
    let user = getUserAuthData(req);
    const data = await req.json();
    data.userId = user.userId;
    data.date = new Date();
    let verifiedData = CreateCommentSchema.parse(data);
    let comment = await createComment(verifiedData);
    return NextResponse.json({ comment });
  } catch (error) {
    return handleError(error);
  }
}
