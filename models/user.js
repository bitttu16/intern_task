const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    user_name: String,
    password: String,
    date: {
        type: Date,
        default: Date.now
    },
})
module.exports = mongoose.model("User", userSchema);