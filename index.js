require("dotenv").config()
const express =  require('express');
const app = express();
const cors = require('cors');
const connectToMongo = require("./connectDB.js");
connectToMongo();

app.use(express.json());
app.use(cors());  

app.use("/task/auth",require('./routes/auth.js'));
app.use("/product",require('./routes/product.js'));


app.listen(process.env.PORT , () => {
    console.log('app is running on port ' + process.env.PORT)
})