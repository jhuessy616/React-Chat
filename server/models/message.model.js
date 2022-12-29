const mongoose = require("mongoose");
// ! We are defining the fields that will be in our collection (AKA Table)
const MessageSchema = new mongoose.Schema({
  when: {
    type: Date,
    default: Date.now,
        required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
      required:true,
    },
  room: {
    type: mongoose.Types.ObjectId,
    ref:"Room",
      required:true,
  },
  body:{
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Message", MessageSchema);
