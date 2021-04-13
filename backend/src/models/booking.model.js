const mongoose = require ("mongoose");

const BookingSchema = mongoose.Schema( 
{  
    bookday: String,
    hours:[{
        hour: String,
        users: [{
            name: String,
            birthday: String
        }]
    }]
}
)

const BookingModel = mongoose.model("booking", BookingSchema)

module.exports = BookingModel