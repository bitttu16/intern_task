const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: String,
    description: String,
    quantity: Number,
    price: Number,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
})

module.exports = mongoose.model("Product", productSchema);