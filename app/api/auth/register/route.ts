import { NextRequest, NextResponse } from "next/server";
import { RegisterSchema } from "../validation";
import { register } from "../auth.services";
import { handleError } from "@/backend/error/error-handler";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    let verifiedData = RegisterSchema.parse(data);
    let { Password, ...user } = await register(verifiedData);
    return NextResponse.json({ user });
  } catch (error) {
    return handleError(error);
  }
}
