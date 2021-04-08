const BookingModel = require("../models/booking.model")


class BookingController{

    async index(req,res){
        const data = await BookingModel.find();

        res.send({ data })
    }
    async store(req,res) {
        const data = req.body

        const newBooking = await BookingModel.create(data)

        res.send({ booking: newBooking})
    }
}

module.exports = new BookingController();