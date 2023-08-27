import { FastifyInstance } from "fastify";
const { getDemitidos, demiteFicha } = require("../controller/demisionController");

async function demisionRoutes(server: FastifyInstance) {

    server.get("/demitidos/:empresaId", getDemitidos);
    server.put("/demite/:empresaId/:fichaId", demiteFicha);
}

export default demisionRoutes;
