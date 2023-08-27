import { FastifyRequest, FastifyReply } from "fastify";
import {
  FichaFuncionarioData,
  FichaFuncionarioSchema,
} from "../schema/fichaSchema";
import prisma from "../utils/prisma";

exports.getDemitidos = async(request: FastifyRequest, reply: FastifyReply) => {
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
        const empresaId = parseInt(params.id);
    
        const employees = await prisma.fichaFuncionario.findMany({
          where: {
            empresaId: empresaId,
            demitido: true,
          },
        });
    
        reply.status(200).send(employees);
      } catch (error) {
        reply.status(500).send({ message: "erro interno" });
      }
};

exports.demiteFicha = async (request: FastifyRequest, reply: FastifyReply) => {
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

          const params = request.params as { empresaId: string, fichaId: string };
          const empresaId = parseInt(params.empresaId);
          const fichaId = parseInt(params.fichaId);

          const demitidoFicha = await prisma.fichaFuncionario.update({
            where: {
                id: fichaId,
                empresaId: empresaId
            },
            data: {
                demitido: true,
            },
          });

          const validatedDemitidoFicha: FichaFuncionarioData = FichaFuncionarioSchema.parse({
            id: demitidoFicha.id,
            nome: demitidoFicha.nome,
            email: demitidoFicha.email,
            nascimento: demitidoFicha.nascimento.toString(),
            nacionalidade: demitidoFicha.nacionalidade,
            cpf: demitidoFicha.cpf,
            rg: demitidoFicha.rg,
            cargo: demitidoFicha.cargo,
            endereco: demitidoFicha.endereco,
            pispasep: demitidoFicha.pispasep,
            admissao: demitidoFicha.admissao.toString(),
            formacao: demitidoFicha.formacao,
            ctps: demitidoFicha.ctps,
            empresaId: demitidoFicha.empresaId,
            demitido: true,
          });

          reply.status(200).send(validatedDemitidoFicha);
    }   catch (error) {
        reply.status(500).send({ error });
        console.log(error);
    }
}

