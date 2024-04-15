import { QueryDtoSchema } from "@/backend/dto/query.dto";
import z from "zod";
export const CreateCommentSchema = z.object({
  text: z.string(),
  date: z.date(),
  userId: z.number(),
  parentId: z.number().optional(),
  gameId: z.number(),
});

export type ICreateComment = z.infer<typeof CreateCommentSchema>;

export const GameCommentQuerySchema = QueryDtoSchema.extend({
  parentId: z.coerce.number().optional().nullable().default(null),
  gameId: z.coerce.number(),
});

export type IGameCommentQuery = z.infer<typeof GameCommentQuerySchema>;
