import { NextRequest, NextResponse } from "next/server";
import { getUserAuthData } from "../../../auth/auth.services";
import { handleError } from "@/backend/error/error-handler";
import { RemoveWishListSchema } from "../../validation";
import { removeWishlist } from "../../wishlist.service";

export async function POST(req: NextRequest) {
  try {
    let user = getUserAuthData(req);
    const data = await req.json();
    data.userId = user.userId;
    let verifiedData = RemoveWishListSchema.parse(data);
    let wishlist = await removeWishlist(verifiedData);
    return NextResponse.json({ wishlist });
  } catch (error) {
    return handleError(error);
  }
}
