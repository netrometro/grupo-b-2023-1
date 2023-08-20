import { FastifyInstance } from "fastify";
const { createFicha, deleteFicha, showFicha } = require("../controller/fichaController");


async function fichaRoutes(server: FastifyInstance) {
    server.post("/createFicha", createFicha);
    server.delete("/deleteFicha", deleteFicha);
    server.get("/showFicha", showFicha)

}

export default fichaRoutes;