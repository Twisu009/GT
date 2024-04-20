import { NextRequest, NextResponse } from "next/server";
import { handleError } from "@/backend/error/error-handler";
import { importGames } from "@/backend/igdb/igdb.service";
import { getPrismaInstance } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    // let prisma = getPrismaInstance();
    // await prisma.gameRating.deleteMany({});
    // await prisma.gameGenre.deleteMany({});
    // await prisma.comment.deleteMany({});
    // await prisma.wishlist.deleteMany({});
    // await prisma.genre.deleteMany({});
    // await prisma.game.deleteMany({});
    // await importGames();
    return NextResponse.json({ message: "Welcome to G-Troove API!" });
  } catch (error) {
    return handleError(error);
  }
}
