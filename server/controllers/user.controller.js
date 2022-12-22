const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ? Create a route that is a POST ("/signup")
router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    // 1. create a new object based off the Model Schema (ie User)

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    // 2. Try Catch - we want to try and save the data but if we get an error we want to send back the error message.

    // mongoose has built in .save, writing the file
    const newUser = await user.save();
    // After we generate a NEW user we can generate a token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT, {
      expiresIn: 60 * 60 * 24,
    });

    res.status(201).json({
      user: newUser,
      message: "Success:User Created",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//? Create a ('/login') route POST
//? Make sure the route is working
//? Full url: localhost:4000/user/login
//? Try to console log the email in the route

router.post("/login", async (req, res) => {
  try {
    // 1. Check our database to see if the email that is supplied in the body is found in our database
    const user = await User.findOne({ email: req.body.email });

    // We don't find a user we exit and throw an ERROR
    if (!user) {
      throw new Error("User Not Found");
    }
    // 2. if we found a document (aka record) in the database validate that password matches otherwise send a response that we don't have a match
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    // Passwords do not match we throw an ERROR
    if (!isPasswordMatch) {
      throw new Error("Passwords Do Not Match");
    }
    // Pass all our checks
    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: 60 * 60 * 24,
    });
    res.status(202).json({ user: user, message: "Success", token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update
router.patch("/update/:id", async (req, res) => {
    try {
        const filter = { _id: req.params.id }

        const update = req.body;
        const returnOptions = { new: true };

        const user = await User.findOneAndUpdate(filter, update, returnOptions);
        
        res.status(202).json({message:"User updated", updatedUser:user})

    }
     catch (error) {
        res.status(500).json({ message: error.message });   
    }
})

// delete 
router.delete("/delete/:id", async (req, res) => {
    try {
        const userToDelete = await User.findById({ _id: req.params.id });
        const deletedUser = await User.deleteOne({ _id: req.params.id });
        res.json({
        userThatWasDeleted: userToDelete,
        deletedUser: deletedUser,
        message: deletedUser.deletedCount > 0? "User was deleted" : "User was not removed"});

    }
     catch (error) {
        res.json({ message: error.message });   
    }
})

module.exports = router;
