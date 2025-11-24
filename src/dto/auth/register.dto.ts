import { z } from "zod";
export const RegisterDto = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  roleId: z.string().uuid({ message: "Invalid role ID" }),
});

