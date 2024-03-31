import z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const RegisterSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  dob: z.coerce.date(),
  password: z.string(),
});

export const UserAuthSchema = z.object({
  userId: z.number(),
});
