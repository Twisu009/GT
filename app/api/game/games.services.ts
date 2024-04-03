import { getPrismaInstance } from "@/lib/prisma";
import { ICreateGame, IGameQuery, IUpdateGame } from "./validation";
import { CustomError, NotFoundError } from "@/backend/error/error";

export async function getOneGame(id: number) {
  let prisma = getPrismaInstance();
  let game = await prisma.game.findUnique({
    include: {
      GameGenre: {
        include: {
          genre: true,
        },
      },
    },
    where: {
      GameID: id,
    },
  });

  return game;
}
export async function getManyGames(dto: IGameQuery) {
  let prisma = getPrismaInstance();
  const { skip, count, value, genreIds, userIds } = dto;
  let genres = await prisma.game.findMany({
    skip,
    take: count,
    include: {
      GameGenre: {
        include: {
          genre: true,
        },
      },
    },
    where: {
      Title: {
        contains: value,
      },
      UserID: {
        in: userIds,
      },
      GameGenre: {
        some: {
          GenreID: {
            in: genreIds,
          },
        },
      },
    },
  });
  let total = await prisma.game.count({
    where: {
      Title: {
        contains: value,
      },
      UserID: {
        in: userIds,
      },
      GameGenre: {
        some: {
          GenreID: {
            in: genreIds,
          },
        },
      },
    },
  });
  return {
    results: genres,
    total,
  };
}

export async function createGame(dto: ICreateGame) {
  let prisma = getPrismaInstance();
  let game = await prisma.game.create({
    data: {
      Title: dto.title,
      Description: dto.description,
      ReleaseDate: dto.releaseDate,
      UserID: dto.userId,
    },
  });
  let genresFiltered = Array.from(new Set(dto.genres));
  let genres = await prisma.gameGenre.createMany({
    data: genresFiltered.map((val) => {
      return {
        GameID: game.GameID,
        GenreID: val,
      };
    }),
  });

  return {
    ...game,
  };
}
export async function updateGame(dto: IUpdateGame) {
  let prisma = getPrismaInstance();
  let game = await prisma.game.findUnique({
    where: {
      GameID: dto.id,
    },
  });
  if (!game) throw new NotFoundError("Game not found!");
  if (game.UserID !== dto.userId)
    throw new CustomError("Cannot update other users games!", 400);
  game.Title = dto.title;
  game.ReleaseDate = dto.releaseDate;
  game.Description = dto.description;
  let genresFiltered = Array.from(new Set(dto.genres));
  //delete previous genres
  await prisma.gameGenre.deleteMany({
    where: {
      GameID: dto.id,
    },
  });
  await prisma.gameGenre.createMany({
    data: genresFiltered.map((val) => {
      return {
        GameID: dto.id,
        GenreID: val,
      };
    }),
  });
  game = await prisma.game.update({
    where: { GameID: dto.id },
    data: { ...game },
  });
  return {
    ...game,
  };
}
