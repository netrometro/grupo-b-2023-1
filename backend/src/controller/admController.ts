import { FastifyRequest, FastifyReply } from "fastify";
import { admSchema, admSchemaEdit } from "../schema/admSchema";
import bcrypt from "bcrypt";
import { z } from "zod";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createAdm = async (req: FastifyRequest, res: FastifyReply) => {
  console.log("primeiro print");
  const { nome, email, senha, cpf } = admSchema.parse(req.body);

  console.log("segundo print");
  const hashedSenha = bcrypt.hashSync(senha, 10);
  console.log("terceiro print");

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

  const { nome, email, senha, cpf } = admSchemaEdit.parse(req.body);

  let dataToUpdate: {
    nome: string;
    email: string;
    senha?: string;
    cpf: string;
  } = {
    nome,
    email,
    cpf,
  };

  if (senha !== null) {
    const hashedSenha = bcrypt.hashSync(senha, 10);
    dataToUpdate.senha = hashedSenha;
  }

  const administrador = await prisma.administrador.update({
    where: {
      id: Number(admId),
    },
    data: dataToUpdate,
  });

  return administrador;
};

exports.getAdmin = async (req: FastifyRequest, res: FastifyReply) => {
  const paramsSchema = z.object({
    id: z.string(),
  });

  const { id } = paramsSchema.parse(req.params);

  const administrador = await prisma.administrador.findUnique({
    where: {
      id: Number(id),
    },
  });

  return administrador;
};
