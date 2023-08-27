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

  const hasEmployer = await prisma.fichaFuncionario.findUnique({
    where: {
      id: parseInt(employerId),
    },
  });

  if (hasEmployer) {
    try {
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

      return res.status(200).send(overtime);
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Ocorreu um erro interno no servidor" });
    }
  } else {
    return res.status(400).send({ message: "Funcionário não encontrado" });
  }
};

exports.listOvertimeByEmployer = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const paramsSchema = z.object({
    employerId: z.string(),
  });

  const { employerId } = paramsSchema.parse(req.params);

  const hasEmployer = await prisma.fichaFuncionario.findUnique({
    where: {
      id: parseInt(employerId),
    },
  });

  if (hasEmployer) {
    try {
      const overtime = await prisma.horasExtras.findMany({
        where: {
          funcionarioId: parseInt(employerId),
        },
      });

      return res.status(200).send(overtime);
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Ocorreu um erro interno no servidor" });
    }
  } else {
    return res.status(400).send({ message: "Funcionário não encontrado" });
  }
};

exports.payOvertime = async (req: FastifyRequest, res: FastifyReply) => {
  const paramsSchema = z.object({
    overtimeId: z.string(),
  });

  const { overtimeId } = paramsSchema.parse(req.params);

  const hasOvertime = await prisma.horasExtras.findUnique({
    where: {
      id: parseInt(overtimeId),
    },
  });

  if (hasOvertime) {
    try {
      const overtime = await prisma.horasExtras.update({
        where: {
          id: parseInt(overtimeId),
        },
        data: {
          pago: true,
        },
      });
      return res.status(200).send(overtime);
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Ocorreu um erro interno no servidor" });
    }
  } else {
    return res
      .status(400)
      .send({ message: "Nenhuma hora extra cadastrada com esse id" });
  }
};

exports.deleteOvertime = async (req: FastifyRequest, res: FastifyReply) => {
  const paramsSchema = z.object({
    overtimeId: z.string(),
  });

  const { overtimeId } = paramsSchema.parse(req.params);

  const hasOvertime = await prisma.horasExtras.findUnique({
    where: {
      id: parseInt(overtimeId),
    },
  });

  if (hasOvertime) {
    try {
      const overtime = await prisma.horasExtras.delete({
        where: {
          id: parseInt(overtimeId),
        },
      });
      return res.status(200).send(overtime);
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Nenhuma hora extra cadastrada com esse id" });
    }
  } else {
    return res
      .status(400)
      .send({ message: "Nenhuma hora extra cadastrada com esse id" });
  }
};
