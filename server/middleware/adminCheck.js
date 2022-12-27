const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const adminCheck = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = await jwt.verify(token, process.env.JWT);

    const user = await User.findById(decodedToken.id);

    if (!user) {
      throw Error("User not found");
    }
    if (!user.isAdmin) {
      throw Error("You are not an admin");
    }
    return next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = adminCheck;
