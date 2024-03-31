import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers, "So, what do you say?");
  return Response.json(allUsers);
}
