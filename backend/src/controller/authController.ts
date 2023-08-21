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

  try {
    const administrador = await prisma.administrador.findUnique({
      where: {
        email: email,
      },
    });
    if (administrador && bcrypt.compareSync(senha, administrador.senha)) {
      return res.status(200).send({ id: administrador.id });
    } else {
      return res.status(400).send({ message: "E-mail ou senha inválidos" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Erro interno no servidors" });
  }
};
