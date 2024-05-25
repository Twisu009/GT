import { handleError } from "@/backend/error/error-handler";
import { NextRequest, NextResponse } from "next/server";
import { getUserAuthData } from "../../auth/auth.services";

export async function GET(req: NextRequest) {
  try {
    let user = getUserAuthData(req);
    return NextResponse.json({ user });
  } catch (error) {
    return handleError(error);
  }
}
