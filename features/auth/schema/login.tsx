import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "The username is required"),
  password: z
    .string()
    .min(1, "The password is required")
    .min(8, "The password must be at least 8 characters long"),
});
