import { FastifyInstance } from "fastify";
const { addOvertime } = require("../controller/overtimeController");

async function overtimeRoutes(server: FastifyInstance) {
  server.post("/overtime/:employerId", addOvertime);
}

// adicionar mais rotas aqui

export default overtimeRoutes;
