import { FastifyInstance } from "fastify";
const { createFicha } = require("../controller/fichaController");


async function fichaRoutes(server: FastifyInstance) {
    server.post("/createFicha", createFicha);

}

export default fichaRoutes;