const mongoose = require("mongoose");
// ! We are defining the fields that will be in our collection (AKA Table)
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
   userName: {
    type: String,
     required: true,
    unique:true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
  default: false,}
});

module.exports = mongoose.model("User", UserSchema);