import { signIn } from "../auth.services";
import { LoginSchema } from "../validation";
import { handleError } from "@/backend/error/error-handler";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const credentials = await req.json();
    let verifiedCred = LoginSchema.parse(credentials);
    let user = await signIn(verifiedCred);
    return NextResponse.json({ user });
  } catch (error) {
    return handleError(error);
  }
}
