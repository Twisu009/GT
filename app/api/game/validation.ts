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
