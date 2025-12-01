const express = require("express")
const router = express.Router()

const { protect } = require("../middleware/auth.js")
const { User } = require("../models/userModels")
const jwt = require("jsonwebtoken")



// register

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const normalizedEmail = String(email).trim().toLowerCase();


        const userExists = await User.findOne({ email: normalizedEmail });

        console.log(userExists, "userExists line 24");

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({ username, email, password });
        const token = generateToken(user._id);
        res.status(201).json({
            id: user._id,
            username: user.username,
            email: user.email,
            token,
        });
    } catch (err) {
        console.log(err, "Server error");
        res.status(500).json({ message: "Server error.." });
    }
});

// Login

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the Fields" })
        }

        const user = await User.findOne({ email })
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: "Invalid Credentials" })
        }
        const token = generateToken(user._id)

        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            token
        })
    } catch (error) {
        res.status(500).json({ message: "Server Error" })

    }
})

router.get("/me", protect, async = (req, res) => {
    res.status(200).json(req.user)
})


// Generate JWT_Web_Token 
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
}
// export default router

module.exports = { router }