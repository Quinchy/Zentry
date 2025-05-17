"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { addOrgSchema } from "@/features/auth/schema/auth";
import { getUser } from "@/lib/auth/server";

export async function createOrg(data: z.infer<typeof addOrgSchema>) {
  const result = addOrgSchema.safeParse(data);
  if (!result.success) {
    return { error: result.error.flatten().fieldErrors.organizationName };
  }
  const { organizationName } = result.data;
  const org = await prisma.organization.create({
    data: {
      organizationNo: uuidv4(),
      name: organizationName,
    },
  });
  const user = await getUser();
  await prisma.app_user.update({
    where: {
      id: Number(user?.id),
    },
    data: {
      organizationId: org.id,
    },
  });
  return { success: "Organization created successfully" };
}
