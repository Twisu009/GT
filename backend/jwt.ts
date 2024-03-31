import {
  AuthenticationError,
  InternalServerError,
} from "@/backend/error/error";
import * as jose from "jose"; // token generator

// Uses JWT format
export const generateToken = async (payload: { userId: number }) => {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) throw new InternalServerError();

  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(secret));
};

export const verifyToken = async (token: string) => {
  try {
    const secret = process.env.JWT_SECRET_KEY;
    if (!secret) throw new InternalServerError();
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );
    return payload;
  } catch (err) {
    throw new AuthenticationError();
  }
};
