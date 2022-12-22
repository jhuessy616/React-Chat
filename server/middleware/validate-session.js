const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const validateSession = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = await jwt.verify(token, process.env.JWT);

        const user = await User.findById(decodedToken.id);

        if(!user){
            throw Error("user not found");
        }
        return next();
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
