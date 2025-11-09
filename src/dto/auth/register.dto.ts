import { z } from "zod";
export const RegisterDto = z.object({
  email: z.string().email({message:"Invalid email format"}),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must be contain uppercase")
    .regex(/[a-z]/, "Password must contain lowercase")
    .regex(/[0-9]/, "Password must contain number"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  roleId: z.string().uuid({message:"Invalid role ID"}),
});

