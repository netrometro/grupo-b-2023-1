import { FastifyRequest, FastifyReply } from "fastify";
import admSchema from "../schema/admSchema";
import bcrypt from "bcrypt";
import { z } from "zod";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createAdm = async (req: FastifyRequest, res: FastifyReply) => {
  const { nome, email, senha, cpf } = admSchema.parse(req.body);

  const hashedSenha = bcrypt.hashSync(senha, 10);

  const administrador = await prisma.administrador.create({
    data: {
      nome,
      email,
      senha: hashedSenha,
      cpf,
    },
    select: {
      id: true,
      email: false,
      senha: false,
      cpf: false,
    },
  });

  return administrador;
};

exports.deleteAdmById = async (req: FastifyRequest, res: FastifyReply) => {
  const paramsSchema = z.object({
    id: z.string(),
  });

  const { id } = paramsSchema.parse(req.params);

  await prisma.administrador.delete({
    where: {
      id: Number(id),
    },
  });
};

exports.editAdm = async (req: FastifyRequest, res: FastifyReply) => {
  const paramsSchema = z.object({
    admId: z.string(),
  });

  const { admId } = paramsSchema.parse(req.params);

  console.log(req.body);
  const { nome, email, senha, cpf } = admSchema.parse(req.body);

  // let administrador = await prisma.memory.findUniqueOrThrow({
  //   where: {
  //     id: Number(admId),
  //   },
  // });

  const administrador = await prisma.administrador.update({
    where: {
      id: Number(admId),
    },
    data: {
      nome,
      email,
      senha,
      cpf,
    },
  });

  return administrador;
};
