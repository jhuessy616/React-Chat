// ! Importing mongoose
const mongoose = require("mongoose");
// ! We are defining the fields that will be in our collection (AKA Table)
// Defining MessageSchema. Message object will have when, user, room and body.
const MessageSchema = new mongoose.Schema({
  when: {
    type: Date,
    default: Date.now,
    required: true,
  },
  // user will be the id of the user that created the message
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // room will be the id of the room where the message was created
  room: {
    type: mongoose.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});
// !Exporting the message schema
module.exports = mongoose.model("Message", MessageSchema);
