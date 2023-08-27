import { FastifyInstance } from "fastify";
const {
  createFicha,
  showFicha,
  updateFicha,
  deleteFicha,
  getFichaById,
} = require("../controller/fichaController");

async function fichaRoutes(server: FastifyInstance) {
  server.post("/createFicha/:empresaId", createFicha);
  server.get("/showFicha/:id", showFicha);
  server.put("/updateFicha/:empId/:fichaId", updateFicha);
  server.delete("/deleteFicha/:empId/:fichaId", deleteFicha);
  server.get("/ficha/:id", getFichaById);
}

export default fichaRoutes;
