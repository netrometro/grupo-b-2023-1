import { z } from "zod";

const admSchema = z.object({
  id: z.number(),
  nome: z.string(),
  email: z.string().email(),
  senha: z.string(),
  cpf: z.string(),
});

export default admSchema;
