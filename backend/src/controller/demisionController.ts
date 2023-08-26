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
            reply.status(401).send({ message: "autorização faltando"});
            return;
        }

        const adminData = await prisma.administrador.findUnique({
            where: { id: parseInt(adminId) },
        });

        if (!adminData) {
            reply.status(401).send({ message: "id inválido" });
        }

        const params = request.params as { empresaId: string };
        const empresaId = parseInt(params.empresaId);

        const demitidos = await prisma.fichaFuncionario.findMany({
            where: {
                empresaId: {
                    equals: empresaId,
                },
                demitido: true,
            },
        });

        const validatedDemitidos: FichaFuncionarioData[] = demitidos.map((demitido) => {
            return FichaFuncionarioSchema.parse({
              id: demitido.id,
              nome: demitido.nome,
              email: demitido.email,
              nascimento: demitido.nascimento.toString(),
              nacionalidade: demitido.nacionalidade,
              cpf: demitido.cpf,
              rg: demitido.rg,
              cargo: demitido.cargo,
              endereco: demitido.endereco,
              pispasep: demitido.pispasep,
              admissao: demitido.admissao.toString(),
              formacao: demitido.formacao,
              ctps: demitido.ctps,
              empresaId: demitido.empresaId,
              demitido: true,
            });
          });
      

        reply.status(200).send(validatedDemitidos);
    } catch (error) {
        reply.status(500).send({ error });
        console.log(error);
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

          const params = request.params as { fichaId: string };
          const fichaId = parseInt(params.fichaId);

          const demitidoFicha = await prisma.fichaFuncionario.update({
            where: {
                id: fichaId
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

