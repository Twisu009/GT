import { getPrismaInstance } from "@/lib/prisma";
import {
  ICreateWishList,
  IRemoveWishList,
  IWishlistSumGameQuery,
  IWishlistUserQuery,
} from "./validation";
import { AuthenticationError, CustomError } from "@/backend/error/error";

export async function createWishlist(dto: ICreateWishList) {
  let prisma = getPrismaInstance();
  let checkExisting = await prisma.wishlist.findFirst({
    where: {
      GameID: dto.gameId,
      UserID: dto.userId,
    },
  });
  if (checkExisting)
    throw new CustomError("This game has already been wish-listed!", 400);
  let wishlist = await prisma.wishlist.create({
    data: {
      GameID: dto.gameId,
      UserID: dto.userId,
    },
  });
  return wishlist;
}

export async function removeWishlist(dto: IRemoveWishList) {
  let prisma = getPrismaInstance();
  let checkExisting = await prisma.wishlist.findFirst({
    where: {
      WishlistID: dto.wishlistId,
    },
  });
  if (!checkExisting) throw new CustomError("Wishlist not found!", 400);
  if (dto.userId !== checkExisting.UserID)
    throw new AuthenticationError("Access denied!");
  return await prisma.wishlist.delete({
    where: {
      WishlistID: checkExisting.WishlistID,
    },
  });
}

export async function getManyWishlistUser(dto: IWishlistUserQuery) {
  let prisma = getPrismaInstance();
  const { skip, count, value, gameIds, userId } = dto;
  let wishlists = await prisma.wishlist.findMany({
    skip,
    take: count,
    include: {
      game: true,
    },
    where: {
      game: {
        Title: { contains: value, mode: "insensitive" },
      },
      UserID: userId,
      GameID: {
        in: gameIds,
      },
    },
  });
  let total = await prisma.wishlist.count({
    where: {
      game: {
        Title: {
          contains: value,
          mode: "insensitive",
        },
      },
      UserID: userId,
      GameID: {
        in: gameIds,
      },
    },
  });
  return {
    results: wishlists,
    total,
  };
}

export async function getWishListCountByGame(dto: IWishlistSumGameQuery) {
  let prisma = getPrismaInstance();
  const { gameIds } = dto;
  let games = await prisma.wishlist.groupBy({
    by: ["GameID"],
    where: {
      GameID: {
        in: gameIds,
      },
    },
    _count: {
      GameID: true,
    },
  });

  return {
    results: games,
  };
}
