import { FastifyInstance } from "fastify";
const {
  addOvertime,
  listOvertimeByEmployer,
} = require("../controller/overtimeController");

async function overtimeRoutes(server: FastifyInstance) {
  server.post("/overtime/:employerId", addOvertime);
  server.get("/overtime/:employerId", listOvertimeByEmployer);
}

// adicionar mais rotas aqui

export default overtimeRoutes;
