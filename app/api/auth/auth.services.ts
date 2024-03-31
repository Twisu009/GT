import { IRegister, ISignIn } from "@/app/Types/types";
import {
  AuthenticationError,
  CustomError,
  InternalServerError,
} from "@/backend/error/error";
import { getPrismaInstance } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "../../../backend/jwt";
import { NextRequest } from "next/server";
import { UserAuthSchema } from "./validation";

export async function signIn({ email, password }: ISignIn) {
  let prisma = getPrismaInstance();

  let user = await prisma.user.findFirst({
    where: {
      Email: email,
    },
  });
  if (user === null) throw new AuthenticationError();
  let comparePassword = await comparePasswords(password, user.Password);
  if (!comparePassword) throw new AuthenticationError();
  const { Password, ...otherProperties } = user;
  let token = await generateToken({ userId: otherProperties.UserID });
  console.log(token);
  return { token, ...otherProperties };
}

export async function register({ username, email, password, dob }: IRegister) {
  let prisma = getPrismaInstance();

  let verifyUserName = await prisma.user.findFirst({
    where: {
      Username: username,
    },
  });
  if (verifyUserName) throw new CustomError("Username already exists", 400);

  let verifyEmail = await prisma.user.findFirst({
    where: {
      Email: email,
    },
  });
  if (verifyEmail) throw new CustomError("Email already exists", 400);
  let cryptPass = await hashPassword(password);
  return await prisma.user.create({
    data: {
      Username: username,
      Email: email,
      Password: cryptPass,
      DateOfBirth: dob,
    },
  });
}

export async function hashPassword(password: string) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new InternalServerError("Error hashing password");
  }
}

export async function comparePasswords(
  password: string,
  hashedPassword: string
) {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    throw new InternalServerError("Error comparing passwords");
  }
}

export function getUserAuthData(req: NextRequest) {
  let userData = req.headers.get("user-auth");
  if (userData) {
    userData = JSON.parse(userData);
    return UserAuthSchema.parse(userData);
  }
}
