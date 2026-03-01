import { z } from "zod";
import { EmailSchema, PasswordSchema } from "./shared/commonSchemas";

const NameSchema = z
  .string()
  .nullable()
  .transform((val) => val ?? undefined)
  .pipe(z.string({ message: "Nome é obrigatório" }).min(2, "Nome deve ter no mínimo 2 caracteres"));

export const LoginSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export const RegisterSchema = z
  .object({
    name: NameSchema,
    email: EmailSchema,
    password: PasswordSchema,
    confirmPassword: z
      .string()
      .nullable()
      .transform((val) => val ?? undefined)
      .pipe(z.string({ message: "Confirme a senha" })),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type LoginInput = z.input<typeof LoginSchema>;
export type LoginOutput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.input<typeof RegisterSchema>;
export type RegisterOutput = z.infer<typeof RegisterSchema>;
