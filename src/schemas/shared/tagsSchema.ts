import { z } from "zod";

export const TagsSchema = z.object({
  id: z.number().optional(),

  name: z
    .string()
    .nullable()
    .transform((val) => val ?? null)
    .pipe(z.string({ message: "Campo obrigatório" })),
});

export type TagsInput = z.input<typeof TagsSchema>;
export type TagsOutput = z.infer<typeof TagsSchema>;
