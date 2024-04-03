import { handleError } from "@/backend/error/error-handler";
import { queryFormatter } from "@/backend/query-formatter";
import { NextRequest, NextResponse } from "next/server";
import { WishlistSumGameQuerySchema } from "./validation";
import { getWishListCountByGame } from "./wishlist.service";

export async function GET(req: NextRequest) {
  try {
    let queryData = queryFormatter(req);
    let verifiedData = WishlistSumGameQuerySchema.parse(queryData);
    let games = await getWishListCountByGame(verifiedData);
    return NextResponse.json({ ...games });
  } catch (error) {
    return handleError(error);
  }
}
