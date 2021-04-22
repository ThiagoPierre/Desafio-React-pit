const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const Routes = require ("./routes/users.router");

// Importa dotenv para utilizar variáveis de ambiente
require ('dotenv').config();
const {HTTP_PORT, MONGO_URL} = process.env;

// Conectando-se na database do MongoAtlas
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true
});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));


// Middleware de rotas, /api/rota
app.use("/api", Routes);

// "Ouve" a porta escolhida, nesse caso 3636
app.listen(HTTP_PORT, () => {
    console.log(`Rodando na porta ${HTTP_PORT}`)
});