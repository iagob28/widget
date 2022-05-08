import express from "express";
import { routes } from "./routes";
import cors from "cors";
import { env } from "process";

const app = express();

//GET = Busca informações
//POST = Cadastra infos
//PUT = Atualiza infos de uma entidade
//PATCH = atualiza uma info unica
//DELETE = deletar info

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333, () => {
  console.log("HTTP server running");
});
