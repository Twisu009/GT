import { NextRequest, NextResponse } from "next/server";
import { handleError } from "@/backend/error/error-handler";
import { CreateGenreSchema } from "../validation";
import { createGenre } from "../genre.services";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    let verifiedData = CreateGenreSchema.parse(data);
    let genre = await createGenre(verifiedData);
    return NextResponse.json({ genre });
  } catch (error) {
    return handleError(error);
  }
}
