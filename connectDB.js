const mongoose = require("mongoose");
const url = process.env.URL;
const connectToMongo = () => {
    mongoose.connect(url,() => {
        console.log("Database connected successful");
    })
}
module.exports = connectToMongo;