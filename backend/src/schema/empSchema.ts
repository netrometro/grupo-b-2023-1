import { z } from "zod";

export const EmpSchema = z.object({
  nome: z.string(),
  cnpj: z.string(),
  endereco: z.string(),
  cep: z.string(),
});

export type EmpData = z.infer<typeof EmpSchema>;