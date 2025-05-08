// lib/prisma.ts
import { PrismaClient } from "@/prisma/app/generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const _prisma = new PrismaClient().$extends(withAccelerate());

// Ensure we use a single instance in development (avoids hot-reload issues)
declare global {
  // eslint-disable-next-line no-var
  var prisma: typeof _prisma | undefined;
}

export const prisma =
  global.prisma ||
  // In dev, attach to global so we don't create a new client on every reload
  (global.prisma = _prisma);
