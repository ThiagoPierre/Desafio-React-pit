const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const Routes = require ("./routes/users.router")

//importa dotenv para utilizar variáveis de ambiente
require ('dotenv').config()
const {HTTP_PORT, MONGO_URL} = process.env

// conectando-se na database do mongo
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})

const app = express();

app.use(cors());
// -------bodyParser é desnecessário, ver como retirar depois------
app.use(bodyParser.json());
app.use(morgan("dev"));

app.get("/", (req,res) => {
    res.json({ message: "get funcionando! "})
});

// Middleware de rotas, /api/rota
app.use("/api", Routes);

// Ouve a porta escolhida, nesse caso 3636
app.listen(HTTP_PORT, () => {
    console.log(`Rodando na porta ${HTTP_PORT}`)
});