import { FastifyInstance } from "fastify";
const {
  addOvertime,
  listOvertimeByEmployer,
  payOvertime,
  deleteOvertime,
} = require("../controller/overtimeController");

async function overtimeRoutes(server: FastifyInstance) {
  server.post("/overtime/:employerId", addOvertime);
  server.get("/overtime/:employerId", listOvertimeByEmployer);
  server.put("/pay-overtime/:overtimeId", payOvertime);
  server.delete("/overtime/:overtimeId", deleteOvertime);
}

export default overtimeRoutes;
