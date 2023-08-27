import { z } from "zod";

export const overtimeSchema = z.object({
  data: z.string().datetime(),
  valorPorHoras: z.number(),
  horas: z.number(),
  pago: z.boolean().default(false),
});
