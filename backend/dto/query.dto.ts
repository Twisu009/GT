import z from "zod";
export const QueryDtoSchema = z.object({
    skip: z.coerce.number().int().min(0).default(0),
    count: z.coerce.number().int().min(1).default(10),
    value: z.string().default(""),
});

export type IQueryDto = z.infer<typeof QueryDtoSchema>;
