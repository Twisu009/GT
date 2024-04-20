import { NextRequest, NextResponse } from "next/server";
import { getUserAuthData } from "../../auth/auth.services";
import { CreateWishListSchema, WishlistUserQuerySchema } from "../validation";
import { handleError } from "@/backend/error/error-handler";
import { createWishlist, getManyWishlistUser } from "../wishlist.service";
import { queryFormatter } from "@/backend/query-formatter";

export async function POST(req: NextRequest) {
    try {
        let user = getUserAuthData(req);
        const data = await req.json();
        data.userId = user.userId;
        let verifiedData = CreateWishListSchema.parse(data);
        let wishlist = await createWishlist(verifiedData);
        return NextResponse.json({ wishlist });
    } catch (error) {
        return handleError(error);
    }
}

export async function GET(req: NextRequest) {
    try {
        let queryData = queryFormatter(req);
        let user = getUserAuthData(req);
        queryData.userId = `${user.userId}`;
        let verifiedData = WishlistUserQuerySchema.parse(queryData);
        let wishlists = await getManyWishlistUser(verifiedData);
        return NextResponse.json({ ...wishlists });
    } catch (error) {
        return handleError(error);
    }
}
