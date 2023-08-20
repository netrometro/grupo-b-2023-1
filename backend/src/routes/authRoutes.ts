import { FastifyInstance } from "fastify";
const { auth } = require("../controller/authController");

async function authRoutes(server: FastifyInstance) {
  server.post("/auth", auth);
}

// adicionar mais rotas aqui

export default authRoutes;
