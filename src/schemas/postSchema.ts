import { z } from "zod";
import { TagsSchema } from "./shared/tagsSchema";

export const PostFormSchema = z.object({
  id: z.number().optional(),

  title: z
    .string()
    .nullable()
    .transform((val) => val ?? null)
    .pipe(z.string({ message: "Campo obrigatório" })),

  body: z
    .string()
    .nullable()
    .transform((val) => val ?? null)
    .pipe(z.string({ message: "Campo obrigatório" })),

  image: z
    .custom<File>((val) => val instanceof File, "Imagem é obrigatória")
    .nullable(),

  imageUrl: z.string().nullable().optional(),

  stars: z
    .number()
    .nullable()
    .transform((val) => val ?? null)
    .pipe(z.number({ message: "Campo obrigatório" })),

  tags: z.array(TagsSchema).min(1, { message: "Selecione pelo menos uma tag" }),
});

export type PostInput = z.input<typeof PostFormSchema>;
export type PostOutput = z.infer<typeof PostFormSchema>;
