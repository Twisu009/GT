import { getPrismaInstance } from "@/lib/prisma";
import { ICreateComment, IGameCommentQuery } from "./validation";

export async function createComment(dto: ICreateComment) {
  let prisma = getPrismaInstance();
  let comment = await prisma.comment.create({
    data: {
      UserID: dto.userId,
      CommentText: dto.text,
      CommentDate: dto.date,
      GameID: dto.gameId,
      ParentID: dto.parentId,
    },
  });

  return comment;
}

export async function getManyCommentByGame(dto: IGameCommentQuery) {
  let prisma = getPrismaInstance();
  let comments = await prisma.comment.findMany({
    skip: dto.skip,
    take: dto.count,
    where: {
      GameID: dto.gameId,
      ParentID: dto.parentId,
      CommentText: {
        contains: dto.value,
        mode: "insensitive",
      },
    },
    orderBy: {
      CommentDate: "desc",
    },
  });
  let total = await prisma.comment.count({
    where: {
      GameID: dto.gameId,
      ParentID: dto.parentId,
      CommentText: {
        contains: dto.value,
        mode: "insensitive",
      },
    },
  });
  return {
    results: comments,
    total,
  };
}
