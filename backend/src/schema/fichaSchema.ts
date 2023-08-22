import { z } from "zod";

export const FichaFuncionarioSchema = z.object({
  nome: z.string(),
  email: z.string().email(),
  nascimento: z.string().datetime(),
  nacionalidade: z.string(),
  cpf: z.string(),
  rg: z.string(),
  cargo: z.string(),
  endereco: z.string(),
  pispasep: z.string(),
  admissao: z.string().datetime(),
  formacao: z.string(),
  ctps: z.string(),
});

export type FichaFuncionarioData = z.infer<typeof FichaFuncionarioSchema>;
