
import {FastifyRequest, FastifyReply} from "fastify";
import {FichaFuncionarioSchema} from "../schema/fichaSchema";
import { PrismaClient } from "@prisma/client";

const prismaClient = require("@prisma/client");
const prisma = new PrismaClient();

//create ficha
exports.createFicha = async (req: FastifyRequest, res: FastifyReply) => {
        const { id, nome, email, nascimento, nacionalidade, cpf, rg, cargo, endereco, pispasep, admissao, formacao, ctps, empresaId } = FichaFuncionarioSchema.parse(req.body);

        const ficha = await prisma.fichaFuncionario.create({
            data: {
                id: id,
                nome: nome,
                email: email,
                nascimento: nascimento,
                nacionalidade: nacionalidade,
                cpf: cpf,
                rg: rg,
                cargo: cargo,
                endereco: endereco,
                pispasep: pispasep,
                admissao: admissao,
                formacao: formacao,
                ctps: ctps,
                empresaId: empresaId,
            }
        });

        res.status(200).send({ message: 'Ficha criada', ficha });
    } 


//read ficha
exports.showFicha = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const ficha = await prisma.fichaFuncionario.findMany();
        res.status(200).send(ficha);
    } catch (error) {
        console.error("Erro ao buscar dados de funcionários", error);
        res.status(500).send({ message: 'Erro ao buscar dados de funcionários' })
    }

}


//update ficha


//delete ficha
exports.deleteFicha = async (req: FastifyRequest, res: FastifyReply) => {
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
