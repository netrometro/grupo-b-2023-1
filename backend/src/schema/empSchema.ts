import { z } from "zod";

export const EmpSchema = z.object({
  id: z.number(),
  nome: z.string(),
  cnpj: z.string(),
  endereco: z.string(),
  cep: z.string(),
  administradorId: z.number(),
});

export type EmpData = z.infer<typeof EmpSchema>;

