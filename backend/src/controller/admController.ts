import { FastifyRequest, FastifyReply } from "fastify";
import admSchema from "../schema/admSchema";
import bcrypt from "bcrypt";

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
      senha: true,
      cpf: false,
    },
  });

  return administrador;
};
