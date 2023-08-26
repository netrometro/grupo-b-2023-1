import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { overtimeSchema } from "../schema/overtimeSchema";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addOvertime = async (req: FastifyRequest, res: FastifyReply) => {
  const paramsSchema = z.object({
    employerId: z.string(),
  });

  const { data, horas, valorPorHoras, pago } = overtimeSchema.parse(req.body);
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

  return overtime;
};

exports.listOvertimeByEmployer = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const paramsSchema = z.object({
    employerId: z.string(),
  });

  const { employerId } = paramsSchema.parse(req.params);

  const overtime = await prisma.horasExtras.findMany({
    where: {
      funcionarioId: parseInt(employerId),
    },
  });

  return overtime;
};
