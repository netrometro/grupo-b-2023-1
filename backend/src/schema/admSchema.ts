import { z } from "zod";

const admSchema = z.object({
  nome: z.string(),
  email: z.string().email(),
  senha: z.string(),
});

export default admSchema;

