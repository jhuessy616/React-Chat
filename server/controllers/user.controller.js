// !----------------- Import section for User Controller-------------------------
const router = require("express").Router();
const User = require("../models/user.model");
// bcryt is the password hashing we are using
const bcrypt = require("bcryptjs");
// jwt is the web token we are using
const jwt = require("jsonwebtoken");
// Middleware we have created to check if someone is logged in
const validateSession = require("../middleware/validate-session");

//! Creating a route that is a POST ("/signup")
// Creating a user
router.post("/signup", async (req, res) => {
  try {
    //1. Creating a new object based off the User Model Schema (ie User). We do not include is Admin because we only want those with server access to be able to do so.
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    // 2. Try Catch - we want to try and save the data but if we get an error we want to send back the error message.
    // mongoose has built in .save, writing the file for us
    const newUser = await user.save();
    // After we generate a NEW user we will generate a token to identify that user
    const token = jwt.sign({ id: newUser._id, isAdmin:newUser.isAdmin}, process.env.JWT, {
      expiresIn: 60 * 60 * 24,
    });
    // Success response, status 201 user created
    res.status(201).json({
      user: newUser,
      message: "Success",
      token: token,
    });
    // Error response, status 400 because client gave bad or incomplete data.
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//! Creating a ('/login') route POST ------------------------------------------------
// endpoint to login
router.post("/login", async (req, res) => {
  try {
    // 1. Check our database to see if the email that is supplied in the body is found in our database
    const user = await User.findOne({ email: req.body.email });
    // We don't find an email we exit and throw an ERROR
    if (!user) {
      throw new Error("Email Not Found");
    }
    // 2. If we found a document (aka record, and in this case email) in the database validate that password matches otherwise send a response that we don't have a match
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    //If passwords do not match we throw an ERROR
    if (!isPasswordMatch) {
      throw new Error("Passwords Do Not Match");
    }
    // If all our checks are passed we will provide a token to the user upon successful login
    const token = jwt.sign({ id: user._id, isAdmin:user.isAdmin }, process.env.JWT, {
      expiresIn: 60 * 60 * 24,
    });
    // Successful login status
    res.status(202).json({ user: user, message: "Success", token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// ! Update a user endpoint --------------------------------------
router.patch("/update/:id", validateSession, async (req, res) => {
  try {
    // finding the user by id
    const userToUpdate = await User.findById({ _id: req.params.id });
    // if user not found
    if (!userToUpdate) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    console.log(req.user._id)
    console.log(userToUpdate._id)
    console.log(req.user._id.toString() == userToUpdate._id.toString())
    // checking to see if the user is the creator or an admin. If they aren't, they get an error.
    if ((!req.user.isAdmin )&& (req.user._id.toString() != userToUpdate._id.toString())) {
      res
        .status(403)
        .json({ message: "You do not have permission to update that user." });
      return;
    }
    // Creating a filter to retrieve user
    const filter = { _id: req.params.id };
    // If a password is changed, it will be hashed.
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    // Update the user information
    const update = req.body;
    const returnOptions = { new: true };
    // using method find one and update to make the appropriate changes.
    const user = await User.findOneAndUpdate(filter, update, returnOptions);
    // success message
    res.status(202).json({ message: "User updated", updatedUser: user });
  } catch (error) {
    // error message
    res.status(500).json({ message: error.message });
  }
});

// ! Delete a user endpoint --------------------------------------
router.delete("/delete/:id", validateSession, async (req, res) => {
  try {
    // finding the user we want to delete
    const userToDelete = await User.findById({ _id: req.params.id });
    // if that user doesn't exist
    if (!userToDelete) {
      res.status(404).json({ massage: "user not found" });
      return;
    }
    // if the user is not an admin/ the creator of the user.
    if ((!req.user.isAdmin) && (req.user._id.toString() != userToDelete._id.toString())) {
      res
        .status(403)
        .json({ message: "You do not have permission to delete that user." });
      return;
    }
    // delete the user using the method of delete one based on the params.
    const deletedUser = await User.deleteOne({ _id: req.params.id });
    res.status(200).json({
      userThatWasDeleted: userToDelete,
      deletedUser: deletedUser,
      message:
        deletedUser.deletedCount > 0
          ? "User was deleted"
          : "User was not removed",
    });
  } catch (error) {
    // if there's a server error
    res.status(500).json({ message: error.message });
  }
});

// ! Get current User 
router.get("/me", validateSession, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user._id });

    res.status(200).json({
      user: user,
      message: "Success",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ! Get one User --------------------------------------------
router.get("/:id", validateSession, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });

    res.status(200).json({
      user: user,
      message: "Success",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//!Exporting the router
module.exports = router;
