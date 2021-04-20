const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema (
    {
        bookday: String,
        hour: String,
        name: String,
        birthday:Date,
        isCompleted:{type: Boolean, default: false},
        obs: {type:String, default: ''}
    }
);

const UsersModel = mongoose.model("users", UsersSchema)

module.exports =  UsersModel
