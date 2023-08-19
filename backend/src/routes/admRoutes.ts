import { FastifyInstance } from "fastify";
const {
  createAdm,
  deleteAdmById,
  editAdm,
} = require("../controller/admController");

async function userRoutes(server: FastifyInstance) {
  server.post("/admin", createAdm);
  server.delete("/admin/:id", deleteAdmById);
  server.put("/admin/:admId", editAdm);
}

// adicionar mais rotas aqui

export default userRoutes;
