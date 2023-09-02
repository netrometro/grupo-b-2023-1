import { FastifyReply, FastifyRequest } from "fastify";
import { emailSchema } from "../schema/emailSchema";
const mailer = require("nodemailer");

exports.sendEmail = async (req: FastifyRequest, res: FastifyReply) => {
  const { email, message, nome, empresa } = emailSchema.parse(req.body);

  const transporter = mailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_EMAIL,
    to: email,
    subject: `Mensagem da empresa ${empresa}`,
    html: `<h1>Olá, ${nome}!</h1><span>${message}</span><br><br><span>Att, ${empresa}.</span>`,
  };

  try {
    transporter.sendMail(mailOptions);
    return res.status(200).send({ message: "E-mail enviado com sucesso" });
  } catch (error) {
    return res.status(400).send({
      message: "Ocorreu um erro ao enviar o e-mail",
    });
  }
};
