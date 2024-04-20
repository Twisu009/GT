import z from "zod";
export const CreateGenreSchema = z.object({
  name: z.string(),
  mediaUrl: z.string().optional().default(""),
});

export type ICreateGenre = z.infer<typeof CreateGenreSchema>;

export const UpdateGenreSchema = CreateGenreSchema.extend({
  id: z.coerce.number(),
});

export type IUpdateGenre = z.infer<typeof UpdateGenreSchema>;
