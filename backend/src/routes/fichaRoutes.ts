import { FastifyInstance } from "fastify";
const { createFicha, showFicha } = require("../controller/fichaController");

async function fichaRoutes(server: FastifyInstance) {

    server.post("/createFicha/:empresaId", createFicha);
    server.get("/showFicha/:id", showFicha)

}

export default fichaRoutes;