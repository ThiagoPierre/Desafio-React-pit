const mongoose = require ("mongose");

const BookingSchema = mongoose.Schema( 
    {
        name: String,
        birthDate: Date,
        birthday: String,
        booking: String,
    }
)

const BookingModel = mongoose.model("booking", BookingSchema)

module.exports = BookingModel