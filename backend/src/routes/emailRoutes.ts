import { FastifyInstance } from "fastify";
const { sendEmail } = require("../controller/emailController");

async function emailRoutes(server: FastifyInstance) {
  server.post("/sendEmail", sendEmail);
}

export default emailRoutes;
