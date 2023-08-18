import { z } from "zod";

export const FichaFuncionarioSchema = z.object({
  id: z.number(),
  nome: z.string(),
  email: z.string().email(),
  nascimento: z.string().transform((val) => new Date(val)),
  nacionalidade: z.string(),
  cpf: z.string(),
  rg: z.string(),
  cargo: z.string(),
  endereco: z.string(),
  pispasep: z.string(),
  admissao: z.string().transform((val) => new Date(val)),
  formacao: z.string(),
  ctps: z.string(),
  empresaId: z.number(),
});

export type FichaFuncionarioData = z.infer<typeof FichaFuncionarioSchema>;
