import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "The email is required")
    .email("The email is not valid"),
  password: z
    .string()
    .min(1, "The password is required")
    .min(8, "The password must be at least 8 characters long"),
});

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "The first name is required"),
    lastName: z.string().min(1, "The last name is required"),
    email: z
      .string()
      .min(1, "The email is required")
      .email("The email is not valid"),
    password: z
      .string()
      .min(1, "The password is required")
      .min(8, "The password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "The confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
