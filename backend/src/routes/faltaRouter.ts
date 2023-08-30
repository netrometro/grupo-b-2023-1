import { FastifyInstance } from "fastify";
const {
    createFalta,
    getFaltas,
    updateFalta,
    deleteFalta,
    getFaltaById,
} = require("../controller/faltaController");

  
  async function faltaRoutes(server: FastifyInstance) {
    server.post("/createFalta/:employeeId", createFalta);
    server.get("/getFaltas/:employeeId", getFaltas);
    server.get("/falta/:id", getFaltaById);
    server.put("/updateFalta/:employeeId/:faltaId", updateFalta );
    server.delete("/deleteFalta/:employeeId/:faltaId", deleteFalta);
  
  }
  
  export default faltaRoutes;
  