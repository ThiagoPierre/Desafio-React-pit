const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const BookingRouter = require("./routes/booking.routes");

require ('dotenv').config()
const {HTTP_PORT, MONGO_URL} = process.env

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

app.get("/", (req,res) => {
    res.json({ message: "get funcionando! "})
});

app.use("/api", BookingRouter);

app.listen(3636, () => {
    console.log(`Rodando na porta ${HTTP_PORT}`)
});