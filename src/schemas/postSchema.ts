import { z } from "zod";
import { TagsSchema } from "./shared/tagsSchema";

export const PostSchema = z.object({
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

  imageUrl: z
    .string()
    .nullable()
    .transform((val) => val ?? null)
    .pipe(z.string({ message: "Campo obrigatório" })),

  stars: z
    .number()
    .nullable()
    .transform((val) => val ?? null)
    .pipe(z.number({ message: "Campo obrigatório" })),

  tags: z.array(TagsSchema).optional(),
});

export type PostInput = z.input<typeof PostSchema>;
export type PostOutput = z.infer<typeof PostSchema>;
