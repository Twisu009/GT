import z from "zod";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type ILogin = z.infer<typeof LoginSchema>;

const RegisterSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  dob: z.coerce.date(),
  password: z.string(),
});
type IRegister = z.infer<typeof RegisterSchema>;

const UserAuthSchema = z.object({
  userId: z.number(),
});
type IUserAuth = z.infer<typeof UserAuthSchema>;

export { LoginSchema, RegisterSchema, UserAuthSchema };
export type { ILogin, IRegister, IUserAuth };
