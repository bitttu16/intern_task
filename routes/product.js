const express = require("express");
const User = require("../models/user")
const Product = require("../models/products")
const router = express.Router();
const fetchUser = require("../middleware/jwtVerify")

router.post("/addproduct", fetchUser, async (req, res) => {
    const { name, description, quantity, price } = req.body;
    try {
        if (!name || !description || !quantity || !price) {
            return res.json({ success: true, mes: "all field require" })
        }

        const productData = new Product({
            name,
            description,
            quantity,
            price,
            createdBy: req.user.id,
        })

        const data = await productData.save();

        return res.json({ success: true, mess: data });
    }
    catch (error) {
        console.log(error)
        res.json(error);
    }
})

router.get("/allproduct", fetchUser, async (req, res) => {
    const data = await Product.find({ createdBy: req.user.id });
    return res.json({ mes: data });
})

module.exports = router