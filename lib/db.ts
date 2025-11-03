import { PrismaClient } from "@/app/generated/prisma/client";

const gloablForPrisma=global as unknown as {prisma:PrismaClient}

export const prisma=gloablForPrisma.prisma || new PrismaClient();