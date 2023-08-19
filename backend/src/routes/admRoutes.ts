import { FastifyInstance } from "fastify";
const { createAdm } = require("../controller/admController");

async function userRoutes(server: FastifyInstance) {
  server.post("/createadmin", createAdm);
}

// adicionar mais rotas aqui

export default userRoutes;
