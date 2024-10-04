const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    let user = await User.findOne({ email });
    if (user) {
        res.status(400);
        throw new Error("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    user = await User.create({ name, email, password: hashPassword, extra: "Extra info", extras: "More extra info" });
    if (!user) {
        res.status(400);
        throw new Error("Invalid user entry");
    }
    //res.status(201).json({ _id: user.id, name: user.name, email: user.email, extra: "user.extra" });
    res.status(201).json(user);
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        const data = { _id: user.id, name: user.name, email: user.email, token: generateJWTToken(user._id) };
        res.json(data);
    }
    else {
        res.status(400);
        throw new Error("Invalid data");
    }
});

const getCurrentUser = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id);
    res.json({ id: _id, name, email });
});

const generateJWTToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "5d" });

module.exports = { registerUser, loginUser, getCurrentUser };