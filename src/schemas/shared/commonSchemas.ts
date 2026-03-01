import { z } from "zod";

export const EmailSchema = z
  .string()
  .nullable()
  .transform((val) => val ?? undefined)
  .pipe(z.string({ message: "Email é obrigatório" }).email("Email inválido"));

export const PasswordSchema = z
  .string()
  .nullable()
  .transform((val) => val ?? undefined)
  .pipe(
    z
      .string({ message: "Senha é obrigatória" })
      .min(6, "Senha deve ter no mínimo 6 caracteres")
  );
