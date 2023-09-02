import { z } from "zod";

export const emailSchema = z.object({
  nome: z.string(),
  email: z.string().email({
    message: "E-mail inválido",
  }),
  message: z.string(),
  empresa: z.string(),
});
