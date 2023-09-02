import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().email({
    message: "E-mail inválido",
  }),
  message: z.string(),
});
