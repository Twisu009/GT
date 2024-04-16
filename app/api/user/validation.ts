import { QueryDtoSchema } from "@/backend/dto/query.dto";
import z from "zod";
export const UserQuerySchema = QueryDtoSchema.extend({
  userIds: z.array(z.coerce.number()).optional(),
});
export type IUserQuery = z.infer<typeof UserQuerySchema>;
