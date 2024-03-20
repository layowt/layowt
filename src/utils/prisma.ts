import { PrismaClient } from "@prisma/client";

// This declares a global variable prisma of type PrismaClient or undefined. 
// this allows using prisma globally throughout the application.

declare global {
  var prisma: PrismaClient | undefined;
};

export const prisma = globalThis.prisma || new PrismaClient();

// This ensures that in development environments, changes to the Prisma client instance are reflected globally 
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;