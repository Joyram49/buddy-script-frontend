import { z } from "zod";

export const SignUpSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  email: z.string().email("Please enter valid email address!"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long!")
    .refine((val) => /[A-Z]/.test(val), {
      message: "Must contain uppercase letter",
    })
    .refine((val) => /[a-z]/.test(val), {
      message: "Must contain lowercase letter",
    })
    .refine((val) => /\d/.test(val) || /[@$!%*#?&]/.test(val), {
      message: "Must contain number or special character",
    }),
});
export const LoginWithEmailSchema = z.object({
  email: z.string().email("Please enter valid email address!"),
  password: z
    .string()
    .min(1, { message: "Please enter password!" })
    .min(6, { message: "Password must be at least 6 characters long!" }),
});
