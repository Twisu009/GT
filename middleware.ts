import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./backend/jwt";
import { handleError } from "@/backend/error/error-handler";
import { AuthenticationError } from "@/backend/error/error";

export async function middleware(request: NextRequest, response: NextResponse) {
    try {
        console.log("invoke token auth");
        const token = request.headers
            .get("Authorization")
            ?.replace("Bearer ", "");
        if (!token) {
            throw new AuthenticationError();
        }
        const decoded = await verifyToken(token);
        if (!decoded) {
            throw new AuthenticationError();
        }

        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("user-auth", JSON.stringify(decoded));
        return NextResponse.next({ request: { headers: requestHeaders } });
    } catch (error) {
        return handleError(error);
    }
}

export const config = {
    matcher: [
        "/api/genre/protected/:path*",
        "/api/game/protected/:path*",
        "/api/wishlist/protected/:path*",
        "/api/comment/protected/:path*",
    ],
};
