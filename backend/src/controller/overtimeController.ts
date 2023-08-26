import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { overtimeSchema } from "../schema/overtimeSchema";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addOvertime = async (req: FastifyRequest, res: FastifyReply) => {
  const paramsSchema = z.object({
    employerId: z.string(),
  });

  console.log("parou antes do parse");
  const { data, horas, valorPorHoras, pago } = overtimeSchema.parse(req.body);
  console.log("parou depois do parse");
  const { employerId } = paramsSchema.parse(req.params);

  const overtime = await prisma.horasExtras.create({
    data: {
      data: new Date(data),
      horas,
      valorPorHoras,
      pago,
      funcionario: {
        connect: { id: parseInt(employerId) },
      },
    },
  });

  console.log(overtime);
};
