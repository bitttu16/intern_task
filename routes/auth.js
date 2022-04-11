const express = require("express");
const User = require("../models/user")

const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const fetchUser = require("../middleware/jwtVerify")

router.post("/signup", async (req, res) => { // api for signup user
    const { user_name, last_name, first_name, password } = req.body;  // getting user input

    try {

        if (!first_name || !last_name || !user_name || !password)
            return res.status(400).json({ success: false, mes: "all fields require" })

        const olduser = await User.findOne({ user_name });  // find for user in database if exist.

        if (olduser) {
            return res.json({ mes: "username already exist " })
        }
        else if (!olduser) {
            encryptedPassword = await bcrypt.hash(password, 10); // hashing password

            // if user not exist then we will sent otp to given user email
            const user = new User({  //  store data into the database
                first_name,
                last_name,
                user_name,
                password: encryptedPassword
            });
            await user.save();
            const newUser = await User.findOne({ user_name });

            return res.json({ success: true, mes: user })
        }

    } catch (error) {
        console.log(error);
        res.json({ error });
    }

})


router.post("/login", async (req, res) => {
    const { user_name, password } = req.body;  // getting input from user
    try {
        if (!user_name || !password) {   // validating user input
            success = false
            return res.status(400).json({ mes: "please fill all fields" });
        }

        const user = await User.findOne({ user_name });  // finding user in database

        if (!user) {
            success = false
            return res.status(400).json({ mes: "invalid users details" });
        }

        const compare_pass = await bcrypt.compare(password, user.password)  // if user exist then compare password of user.

        if (!compare_pass) {
            success = false
            return res.status(401).json({ success, mes: "invalid details" });
        }
        const token = jwt.sign(  // generation token of logged user
            {
                id: user.id,
                name: user.first_name,
                user_name: user.user_name
            },
            process.env.SECRET_KEY
        )
        success = true
        res.status(201).json({ success: true, mes: token });  // returning response

    } catch (error) {
        console.log(error);
        res.json({ error });

    }


})

router.get("/alluser", async (req, res) => {
    const users = await User.find();
    return res.json({ mess: users });
})

router.get("/userdetails", fetchUser, async (req, res) => {
    console.log(req.user);
    const data = await User.findOne({ user_name: req.user.user_name })
    return res.json({ mes: data });
})

module.exports = router