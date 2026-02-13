// lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("Missing DATABASE_URL in environment");
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    adapter: new PrismaNeon({ connectionString }),
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
