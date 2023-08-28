import { FastifyRequest, FastifyReply } from "fastify";
import { faltaSchema } from "../schema/faltaSchema";
import prisma from "../utils/prisma";

// Create falta
exports.createFalta = async (request: FastifyRequest, reply: FastifyReply) => {
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

    const params = request.params as { employeeId: string };
    const employeeId = parseInt(params.employeeId);

    const { 
        dataFalta,
        tipoFalta,
        descricaoFalta,
    } = faltaSchema.parse(request.body);

    const createdFalta = await prisma.falta.create({
      data: {
        dataFalta: new Date(dataFalta.split("/").reverse().join("-")),
        tipoFalta,
        descricaoFalta,
        funcionario: {
            connect: {id: employeeId},
        }
      },
    });

    reply.status(201).send(createdFalta);
  } catch (error) {
    reply.status(500).send({ error });
    console.log(error);
  }
};

// Read falta
exports.getFaltas = async (request: FastifyRequest, reply: FastifyReply) => {
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

    const params = request.params as { employeeId: string };
    const employeeId = parseInt(params.employeeId);

    const faltas = await prisma.falta.findMany({
        where: {
            funcionarioId: employeeId,
        }
    });

    reply.status(200).send(faltas);
  } catch (error) {
    reply.status(500).send({ message: "erro interno" });
  }
};

exports.getFaltaById = async (request: FastifyRequest, reply: FastifyReply) => {
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

    const params = request.params as { employeeId: string };
    const employeeId = parseInt(params.employeeId);

    /* const faltaId = parseInt(request.params.id); */

    const falta = await prisma.falta.findUnique({
      where: { id: employeeId },
    });

    reply.status(200).send(falta);
  } catch (error) {
    reply.status(500).send({ message: "erro interno"});
    console.log(error);
  }
};

// Update falta
exports.updateFalta = async (request: FastifyRequest, reply: FastifyReply) => {
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

    const params = request.params as { employeeId: string, faltaId: string };
    const employeeId = parseInt(params.employeeId);
    
    const faltaId = parseInt(params.faltaId);
    const { dataFalta,
        tipoFalta,
        descricaoFalta, } = faltaSchema.parse(request.body);

    const updatedFalta = await prisma.falta.update({
      where: { id: faltaId },
      data: {
        dataFalta,
        tipoFalta,
        descricaoFalta,
      },
    });

    reply.status(200).send(updatedFalta);
  } catch (error) {
    reply.status(500).send({ error });
  }
};

// Delete falta
exports.deleteFalta = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    
    const params = request.params as {employeeId: string; faltaId: string};

    const faltaId = parseInt(params.faltaId);

    const deletedFalta = await prisma.falta.delete({
      where: { id: faltaId },
    });

    reply.status(200).send(deletedFalta);
  } catch (error) {
    reply.status(500).send({ error });
    console.log(error);
  }
};
