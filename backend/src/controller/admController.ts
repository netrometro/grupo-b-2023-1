import { FastifyRequest, FastifyReply } from "fastify";
import { admSchema, admSchemaEdit } from "../schema/admSchema";
import bcrypt from "bcrypt";
import { z } from "zod";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createAdm = async (req: FastifyRequest, res: FastifyReply) => {
  const { nome, email, senha, cpf } = admSchema.parse(req.body);
  try {
    const hashedSenha = bcrypt.hashSync(senha, 10);

    const hasEmail = await prisma.administrador.findUnique({
      where: {
        email,
      },
    });

    const hasCpf = await prisma.administrador.findUnique({
      where: {
        cpf,
      },
    });

    if (hasEmail || hasCpf) {
      return res.status(400).send({ message: "E-mail ou CPF já cadastrado" });
    }

    if (!hasEmail && !hasCpf) {
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
      return res.status(200).send(administrador);
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Ocorreu um erro interno no servidor" });
  }
};

exports.deleteAdmById = async (req: FastifyRequest, res: FastifyReply) => {
  const paramsSchema = z.object({
    id: z.string(),
  });

  const { id } = paramsSchema.parse(req.params);

  const hasId = await prisma.administrador.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (hasId) {
    try {
      await prisma.administrador.delete({
        where: {
          id: Number(id),
        },
      });

      return res.status(200).send({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Ocorreu um erro interno no servidor" });
    }
  } else {
    return res.status(400).send({ message: "Usuário não encontrado" });
  }
};

exports.editAdm = async (req: FastifyRequest, res: FastifyReply) => {
  const paramsSchema = z.object({
    admId: z.string(),
  });

  const { admId } = paramsSchema.parse(req.params);
  const { nome, email, senha, cpf } = admSchemaEdit.parse(req.body);

  const hasId = await prisma.administrador.findUnique({
    where: {
      id: Number(admId),
    },
  });

  if (hasId) {
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
    try {
      await prisma.administrador.update({
        where: {
          id: Number(admId),
        },
        data: dataToUpdate,
      });

      return res.status(200).send({ message: "Usuário editado com sucesso" });
    } catch (error) {
      return res.status(500).send({ message: "Erro interno do servidor" });
    }
  } else {
    res.status(400).send({ message: "Usuário não encontrado" });
  }
};

exports.getAdmin = async (req: FastifyRequest, res: FastifyReply) => {
  const paramsSchema = z.object({
    id: z.string(),
  });

  const { id } = paramsSchema.parse(req.params);

  try {
    const administrador = await prisma.administrador.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (administrador) {
      return res.status(200).send(administrador);
    } else {
      return res.status(400).send({ message: "Usuário não encontrado" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Erro interno do servidor" });
  }
};
