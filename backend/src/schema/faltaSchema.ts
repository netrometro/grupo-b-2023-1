import { z } from "zod";

export const faltaSchema = z.object({
    dataFalta: z.string(),
    tipoFalta: z.string(),
    descricaoFalta: z.string(),
});
export type faltaSchema = z.infer<typeof faltaSchema>;