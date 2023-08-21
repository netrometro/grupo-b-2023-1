
import {FastifyRequest, FastifyReply} from "fastify";
import {FichaFuncionarioData, FichaFuncionarioSchema} from "../schema/fichaSchema";
import { PrismaClient } from "@prisma/client";

const prismaClient = require("@prisma/client");
const prisma = new PrismaClient();

//create ficha
exports.createFicha = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const adminId = request.headers.authorization;

        if (!adminId) {
            reply.status(401).send({ message: 'Autorização faltando' });
            return;
        }

        const adminData = await prisma.administrador.findUnique({
            where: { id: parseInt(adminId) },
        });

        if (!adminData) {
            reply.status(401).send({ message: 'ID inválido' });
            return;
        }

        const params = request.params as { empresaId: string };
        const empresaId = parseInt(params.empresaId);

        const fichaData: FichaFuncionarioData = FichaFuncionarioSchema.parse(request.body);

        const createdFicha = await prisma.fichaFuncionario.create({
            data: {
                ...fichaData,
                empresa: {
                    connect: { id: empresaId },
                },
            },
        });

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
          reply.status(401).send({ message: 'autorização faltando' });
          return;
        }
    
        const adminData = await prisma.administrador.findUnique({
          where: { id: parseInt(adminId) },
        });
    
        if (!adminData) {
          reply.status(401).send({ message: 'id invalido' });
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
        reply.status(500).send({ message: 'erro interno' });
      }
}


//update ficha


//delete ficha
/* exports.deleteFicha = async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = FichaFuncionarioSchema.parse(req.params); 
    try {
        const deletedFicha = await prisma.fichaFuncionario.delete({
            where: { id: id }, 
        });

        res.status(200).send({ message: 'Ficha deletada', deletedFicha });
    } catch (error) {
        console.error('Erro ao deletar ficha:', error);
        res.status(500).send({ message: 'Erro deletando ficha', error });
    }
};
 */