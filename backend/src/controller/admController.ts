import { FastifyRequest, FastifyReply } from "fastify";
import admSchema from "../schema/admSchema";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createAdm = async (req: FastifyRequest, res: FastifyReply) => {
  const { nome, email, senha, cpf } = admSchema.parse(req.body);

  const administrador = await prisma.administrador.create({
    data: {
      nome,
      email,
      senha,
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
