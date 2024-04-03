import { NextRequest, NextResponse } from "next/server";
import { handleError } from "@/backend/error/error-handler";
import z from "zod";
import { getOneGame } from "../games.services";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const NumberSchema = z.object({
      id: z.coerce.number(),
    });
    let verifiedData = NumberSchema.parse({ id: params.id });
    let game = await getOneGame(verifiedData.id);
    return NextResponse.json({ ...game });
  } catch (error) {
    return handleError(error);
  }
}
