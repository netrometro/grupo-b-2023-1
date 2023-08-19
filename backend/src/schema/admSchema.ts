import { z } from "zod";

export const admSchema = z.object({
  nome: z.string(),
  email: z.string().email(),
  senha: z.string(),
  cpf: z.string(),
});

export const admSchemaEdit = z.object({
  nome: z.string(),
  email: z.string().email(),
  senha: z.string().nullable(),
  cpf: z.string(),
});
