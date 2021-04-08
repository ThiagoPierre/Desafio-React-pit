const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const BookingRouter = require("./routes/booking.routes");


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

app.get("/", (req,res) => {
    res.json({ message: "get funcionando! "})
});

app.use("/api", BookingRouter);

app.listen(3636, () => {
    console.log(`Rodando na porta 3636`)
});