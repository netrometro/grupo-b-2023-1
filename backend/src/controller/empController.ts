import { FastifyRequest, FastifyReply } from 'fastify';
import prisma from "../utils/prisma";
import { EmpSchema, EmpData } from '../schema/empSchema'; 

async function createEmp(request: FastifyRequest, reply: FastifyReply) {
    try {
      const adminId = request.headers.authorization;
  
      if (!adminId) {
        reply.status(401).send({ message: 'autorizao faltando' });
        return;
      }
  
      const adminData = await prisma.administrador.findUnique({
        where: { id: parseInt(adminId) },
      });
  
      if (!adminData) {
        reply.status(401).send({ message: 'id invalido' });
        return;
      }
  
      const empData: EmpData = EmpSchema.parse(request.body);
  
      const createdEmp = await prisma.empresa.create({
        data: {
          ...empData,
          administrador: {
            connect: { id: adminData.id },
          },
        },
      });
  
      reply.status(201).send(createdEmp);
    } catch (error) {
      reply.status(500).send({ error });
      console.log(error)
    }
};

async function getEmp(request: FastifyRequest, reply: FastifyReply) {
    try {
        const adminId = request.headers.authorization;

        if (!adminId) {
            reply.status(401).send({ message: 'autorização faltando'});
            return;
        }

        const adminData = await prisma.administrador.findUnique({
            where: {
                id: parseInt(adminId)
            },
            include: {
                empresas: true
            },
        });

        if (!adminData) {
            reply.status(401).send({ message: 'id invalido'});
            return;
        }

        const empresas = adminData.empresas;

        reply.status(200).send(empresas);
    }   catch (error) {
        reply.status(500).send({ message: 'erro interno' });
    }
};

async function deleteEmp(request: FastifyRequest, reply: FastifyReply) {
    try {
        const adminId = request.headers.authorization;

        if (!adminId) {
            reply.status(401).send({ message: 'autorização faltando' });
            return;
        }

        const adminData = await prisma.administrador.findUnique({
            where: {
                id: parseInt(adminId)
            },
            include: {
                empresas: true
            },
        });

        if (!adminData) {
            reply.status(401).send({ message: 'id invalido' });
            return;
        }

        const params = request.params as { id: string };
        const empId = parseInt(params.id)

        const targetEmp = adminData.empresas.find(emp => emp.id === empId);
        console.log('target: ', targetEmp);
        if (!targetEmp) {
            reply.status(404).send({ message: 'Empresa não encontrada' });
            return;
        }

        await prisma.empresa.delete({
            where: {
                id: empId
            }
        });

        console.log('company deleted');
        reply.status(200).send({ message: 'Empresa deletada com sucesso' });
    } catch (error) {
        reply.status(500).send({ message: 'erro interno' });
    }
};

async function editEmp(request: FastifyRequest, reply: FastifyReply) {
    try {
        const adminId = request.headers.authorization;

        if (!adminId) {
            reply.status(401).send({ message: 'autorização faltando' });
            return;
        }

        const adminData = await prisma.administrador.findUnique({
            where: {
                id: parseInt(adminId)
            },
            include: {
                empresas: true
            },
        });

        if (!adminData) {
            reply.status(401).send({ message: 'id invalido'});
            return;
        }

        const params = request.params as { id: string };
        const empId = parseInt(params.id);

        const targetEmp = adminData.empresas.find(emp => emp.id === empId);
        if (!targetEmp) {
            reply.status(404).send({ message: 'Empresa não encontrada' });
            return;
        }

        const empData: EmpData = EmpSchema.parse(request.body);

        const updatedEmp = await prisma.empresa.update({
            where: {
                id: empId
            },
            data: empData
        });

        reply.status(200).send(updatedEmp);
    }   catch (error) {
        reply.status(500).send({ message: 'erro interno'});
    }
};

async function getSingleEmp(request: FastifyRequest, reply: FastifyReply) {
    try {
        const adminId = request.headers.authorization;

        if (!adminId) {
            reply.status(401).send({ message: 'autorização faltando'});
            return;
        }

        const adminData = await prisma.administrador.findUnique({
            where: {
                id: parseInt(adminId)
            },
            include: {
                empresas: true
            },
        });

        if (!adminData) {
            reply.status(401).send({ message: 'id invalido'});
            return;
        }

        const params = request.params as { id: string };
        const empId = parseInt(params.id);

        const targetEmp = adminData.empresas.find(emp => emp.id === empId);
        if (!targetEmp) {
            reply.status(404).send({ message: 'Empresa não encontrada' });
            return;
        }

        reply.status(200).send(targetEmp);
    } catch (error) {
        reply.status(500).send({ message: 'erro interno' });
    }
};

export default { 
    createEmp, getEmp, deleteEmp, editEmp, getSingleEmp
};

