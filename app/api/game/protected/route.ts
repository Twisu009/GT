import { NextRequest, NextResponse } from "next/server";
import { handleError } from "@/backend/error/error-handler";
import { CreateGameSchema } from "../validation";
import { createGame } from "../games.services";
import { getUserAuthData } from "../../auth/auth.services";

export async function POST(req: NextRequest) {
  try {
    let user = getUserAuthData(req);
    const data = await req.json();
    data.userId = user.userId;
    let verifiedData = CreateGameSchema.parse(data);
    let genre = await createGame(verifiedData);
    return NextResponse.json({ genre });
  } catch (error) {
    return handleError(error);
  }
}
