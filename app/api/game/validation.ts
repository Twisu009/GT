import { QueryDtoSchema } from "@/backend/dto/query.dto";
import z from "zod";
export const CreateGameSchema = z.object({
  title: z.string(),
  description: z.string().optional().default(""),
  releaseDate: z.coerce.date(),
  userId: z.number(),
  genres: z.array(z.number()),
});

export type ICreateGame = z.infer<typeof CreateGameSchema>;

export const UpdateGameSchema = CreateGameSchema.extend({
  id: z.coerce.number(),
});

export type IUpdateGame = z.infer<typeof UpdateGameSchema>;

export const GameQuerySchema = QueryDtoSchema.extend({
  genreIds: z.array(z.coerce.number()).optional(),
  userIds: z.array(z.coerce.number()).optional(),
});
export type IGameQuery = z.infer<typeof GameQuerySchema>;

export const CreateGameRatingSchema = z.object({
  userId: z.number(),
  gameId: z.number(),
  rating: z.number().min(0).max(10),
});
export type IGameRating = z.infer<typeof CreateGameRatingSchema>;

export const GameRatingQuerySchema = QueryDtoSchema.extend({
  gameIds: z.array(z.coerce.number()).optional(),
});
export type IGameRatingQuery = z.infer<typeof GameRatingQuerySchema>;
