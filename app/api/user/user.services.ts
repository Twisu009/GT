import { getPrismaInstance } from "@/lib/prisma";
import { IUserQuery } from "./validation";

export const getManyUsers = async (dto: IUserQuery) => {
  let prisma = getPrismaInstance();
  const { skip, count, value, userIds } = dto;
  let user = await prisma.user.findMany({
    skip,
    take: count,
    where: {
      Username: {
        contains: value,
        mode: "insensitive",
      },
      UserID: {
        in: userIds,
      },
    },
  });
  let total = await prisma.user.count({
    where: {
      Username: {
        contains: value,
        mode: "insensitive",
      },
      UserID: {
        in: userIds,
      },
    },
  });
  return {
    results: user.map((u) => {
      return {
        UserID: u.UserID,
        Username: u.Username,
        Email: u.Email,
        DateOfBirth: u.DateOfBirth,
      };
    }),
    total,
  };
};
