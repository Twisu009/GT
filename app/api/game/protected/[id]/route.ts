import { NextRequest, NextResponse } from "next/server";
import { handleError } from "@/backend/error/error-handler";
import { UpdateGameSchema } from "../../validation";
import { updateGame } from "../../games.services";
import { getUserAuthData } from "@/app/api/auth/auth.services";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    let user = getUserAuthData(req);
    const data = await req.json();
    data.userId = user.userId;
    data.id = params.id;
    let verifiedData = UpdateGameSchema.parse(data);
    let genre = await updateGame(verifiedData);
    return NextResponse.json({ genre });
  } catch (error) {
    return handleError(error);
  }
}
