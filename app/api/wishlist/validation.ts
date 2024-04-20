import { QueryDtoSchema } from "@/backend/dto/query.dto";
import z from "zod";

export const CreateWishListSchema = z.object({
    userId: z.coerce.number(),
    gameId: z.number(),
});

export type ICreateWishList = z.infer<typeof CreateWishListSchema>;

export const RemoveWishListSchema = z.object({
    userId: z.coerce.number(),
    wishlistId: z.number(),
});

export type IRemoveWishList = z.infer<typeof RemoveWishListSchema>;

export const WishlistUserQuerySchema = QueryDtoSchema.extend({
    gameIds: z.array(z.coerce.number()).optional(),
    userId: z.coerce.number(),
});
export type IWishlistUserQuery = z.infer<typeof WishlistUserQuerySchema>;

export const WishlistSumGameQuerySchema = QueryDtoSchema.extend({
    gameIds: z.array(z.coerce.number()).optional(),
});
export type IWishlistSumGameQuery = z.infer<typeof WishlistSumGameQuerySchema>;
