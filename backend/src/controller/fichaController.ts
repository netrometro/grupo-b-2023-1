import { FastifyRequest, FastifyReply } from "fastify";
import {
  FichaFuncionarioData,
  FichaFuncionarioSchema,
} from "../schema/fichaSchema";
import { PrismaClient } from "@prisma/client";

const prismaClient = require("@prisma/client");
const prisma = new PrismaClient();

//create ficha
exports.createFicha = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const adminId = request.headers.authorization;

    console.log("Primeiro print");

    if (!adminId) {
      reply.status(401).send({ message: "Autorização faltando" });
      return;
    }

    console.log("Segundo print");

    const adminData = await prisma.administrador.findUnique({
      where: { id: parseInt(adminId) },
    });

    console.log("terceiro print");

    if (!adminData) {
      reply.status(401).send({ message: "ID inválido" });
      return;
    }

    console.log("QUARTO print");

    const params = request.params as { empresaId: string };
    console.log("terceiro print");
    const empresaId = parseInt(params.empresaId);
    console.log("terceiro print");

    // const fichaData: FichaFuncionarioData = FichaFuncionarioSchema.parse(
    //   request.body
    // );
    console.log("QUINTO print");
    // console.log(fichaData);
    // console.log("Birthdate:", fichaData.nascimento);
    // console.log("Admission:", fichaData.admissao);

    const {
      nome,
      email,
      nascimento,
      nacionalidade,
      cpf,
      rg,
      cargo,
      endereco,
      pispasep,
      admissao,
      formacao,
      ctps,
      demitido
    } = FichaFuncionarioSchema.parse(request.body);

    const createdFicha = await prisma.fichaFuncionario.create({
      data: {
        nome,
        email,
        nascimento: new Date(nascimento.split("/").reverse().join("-")),
        nacionalidade,
        cpf,
        rg,
        cargo,
        endereco,
        pispasep,
        admissao: new Date(admissao.split("/").reverse().join("-")),
        formacao,
        ctps,
        demitido: false,
        empresa: {
          connect: { id: empresaId },
        },
      },
    });
    console.log("SEXTO print");

    reply.status(201).send(createdFicha);
  } catch (error) {
    reply.status(500).send({ error });
    console.log(error);
  }
};

//read ficha
exports.showFicha = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const adminId = request.headers.authorization;

    if (!adminId) {
      reply.status(401).send({ message: "autorização faltando" });
      return;
    }

    const adminData = await prisma.administrador.findUnique({
      where: { id: parseInt(adminId) },
    });

    if (!adminData) {
      reply.status(401).send({ message: "id invalido" });
      return;
    }

    const params = request.params as { id: string };
    const empId = parseInt(params.id);

    const employees = await prisma.fichaFuncionario.findMany({
      where: {
        empresaId: empId,
      },
    });

    reply.status(200).send(employees);
  } catch (error) {
    reply.status(500).send({ message: "erro interno" });
  }
};

//update ficha
exports.updateFicha = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const adminId = request.headers.authorization;

    if (!adminId) {
      reply.status(401).send({ message: "Autorização faltando" });
      return;
    }

    const adminData = await prisma.administrador.findUnique({
      where: { id: parseInt(adminId) },
    });

    if (!adminData) {
      reply.status(401).send({ message: "ID inválido" });
      return;
    }

    const params = request.params as { empId: string; fichaId: string };
    const fichaId = parseInt(params.fichaId);

    const {
      nome,
      email,
      nascimento,
      nacionalidade,
      cpf,
      rg,
      cargo,
      endereco,
      pispasep,
      admissao,
      formacao,
      ctps,
    } = FichaFuncionarioSchema.parse(request.body);

    const updatedFicha = await prisma.fichaFuncionario.update({
      where: { id: fichaId },
      data: {
        nome,
        email,
        nascimento: new Date(nascimento.split("/").reverse().join("-")),
        nacionalidade,
        cpf,
        rg,
        cargo,
        endereco,
        pispasep,
        admissao: new Date(admissao.split("/").reverse().join("-")),
        formacao,
        ctps,
      },
    });

    reply.status(200).send(updatedFicha);
  } catch (error) {
    reply.status(500).send({ error });
    console.log(error);
  }
};

//delete ficha
exports.deleteFicha = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const params = request.params as { empId: string; fichaId: string };
    const fichaId = parseInt(params.fichaId);

    const deletedFicha = await prisma.fichaFuncionario.delete({
      where: { id: fichaId },
    });

    reply.status(200).send(deletedFicha);
  } catch (error) {
    reply.status(500).send({ error });
    console.log(error);
  }
};
