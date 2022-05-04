import express from "express";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";
import { routes } from "./routes";

const app = express();

//GET = Busca informações
//POST = Cadastra infos
//PUT = Atualiza infos de uma entidade
//PATCH = atualiza uma info unica
//DELETE = deletar info

app.use(express.json());
app.use(routes)


app.listen(3333, () => {
  console.log("HTTP server running");
});
