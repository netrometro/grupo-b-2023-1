import { FastifyReply, FastifyRequest } from "fastify";
import { emailSchema } from "../schema/emailSchema";

exports.sendEmail = async (req: FastifyRequest, res: FastifyReply) => {
  const { email, message, nome } = emailSchema.parse(req.body);

  return res.status(201).send({ email: email, message: message, nome: nome });
};
