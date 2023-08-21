import { z } from "zod";

export const admSchema = z.object({
  nome: z.string(),
  email: z.string().email({
    message: "E-mail inválido",
  }),
  senha: z.string().min(8, {
    message: "A senha precisa ter pelo menos 8 dígitos",
  }),
  cpf: z.string(),
});

export const admSchemaEdit = z.object({
  nome: z.string(),
  email: z.string().email({
    message: "E-mail inválido",
  }),
  senha: z
    .string()
    .min(8, {
      message: "A senha precisa ter pelo menos 8 dígitos",
    })
    .nullable(),
  cpf: z.string(),
});
