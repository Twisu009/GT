import z from "zod";
export const CreateGenreSchema = z.object({
  name: z.string(),
});

export type ICreateGenre = z.infer<typeof CreateGenreSchema>;

export const UpdateGenreSchema = z.object({
  name: z.string(),
  id: z.coerce.number(),
});

export type IUpdateGenre = z.infer<typeof UpdateGenreSchema>;
