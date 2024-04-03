import { NextRequest, NextResponse } from "next/server";
import { CreateGenreSchema, UpdateGenreSchema } from "../../validation";
import { updateGenre } from "../../genre.services";
import { handleError } from "@/backend/error/error-handler";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();
    data.id = params.id;
    let verifiedData = UpdateGenreSchema.parse(data);
    let genre = await updateGenre(verifiedData);
    return NextResponse.json({ genre });
  } catch (error) {
    return handleError(error);
  }
}
