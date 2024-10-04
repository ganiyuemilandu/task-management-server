const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
    let token;
    try {
        const authorization = req.headers.authorization;
        //console.log(authorization);
        if (authorization.startsWith("Bearer")) {
            token = authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        }
    }
    catch (err) {
        console.log(err);
        res.status(401);
        throw new Error("You're not authorized");
    }
    if (!token) {
        res.status(401);
        throw new Error("Not authorized; no token");
    }
});

module.exports = { protect };