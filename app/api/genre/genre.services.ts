import { IQueryDto, QueryDtoSchema } from "@/backend/dto/query.dto";
import { getPrismaInstance } from "@/lib/prisma";
import { ICreateGenre, IUpdateGenre } from "./validation";
import { NotFoundError } from "@/backend/error/error";

export async function createGenre(dto: ICreateGenre) {
  let prisma = getPrismaInstance();
  let genre = await prisma.genre.create({
    data: {
      GenreName: dto.name,
      ImageUrl: dto.mediaUrl,
    },
  });
  return genre;
}

export async function updateGenre(dto: IUpdateGenre) {
  let prisma = getPrismaInstance();
  let genre = await prisma.genre.findUnique({
    where: {
      GenreID: dto.id,
    },
  });
  if (!genre) throw new NotFoundError("Genre not found!");
  genre.GenreName = dto.name;
  genre.ImageUrl = dto.mediaUrl;

  return await prisma.genre.update({
    where: { GenreID: dto.id },
    data: { ...genre },
  });
}
export async function getManyGenres(dto: IQueryDto) {
  let prisma = getPrismaInstance();
  let { skip, count, value } = dto;
  let genres = await prisma.genre.findMany({
    skip,
    take: count,
    where: {
      GenreName: {
        contains: value,
        mode: "insensitive",
      },
    },
  });
  let total = await prisma.genre.count({
    where: {
      GenreName: {
        contains: value,
        mode: "insensitive",
      },
    },
  });
  return {
    results: genres,
    total,
  };
}
export async function getOneGenre(id: number) {
  let prisma = getPrismaInstance();
  let genre = await prisma.genre.findUnique({
    where: {
      GenreID: id,
    },
  });

  return genre;
}
