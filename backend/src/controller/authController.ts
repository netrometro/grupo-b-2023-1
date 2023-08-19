import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from "bcrypt";
import { z } from "zod";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.auth = async (req: FastifyRequest, res: FastifyReply) => {
  const paramsSchema = z.object({
    email: z.string().email(),
    senha: z.string(),
  });
  const { email, senha } = paramsSchema.parse(req.body);

  const administrador = await prisma.administrador.findUnique({
    where: {
      email: email,
    },
  });

  if (administrador && bcrypt.compareSync(senha, administrador.senha)) {
    return { id: administrador.id };
  } else
    throw {
      message: "Usuário ou senha inválido",
    };
};
