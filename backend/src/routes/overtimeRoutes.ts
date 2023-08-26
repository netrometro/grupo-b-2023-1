import { FastifyInstance } from "fastify";
const {
  addOvertime,
  listOvertimeByEmployer,
  payOvertime,
} = require("../controller/overtimeController");

async function overtimeRoutes(server: FastifyInstance) {
  server.post("/overtime/:employerId", addOvertime);
  server.get("/overtime/:employerId", listOvertimeByEmployer);
  server.put("/pay-overtime/:overtimeId", payOvertime);
}

export default overtimeRoutes;
