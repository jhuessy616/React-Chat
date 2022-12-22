const mongoose = require("mongoose");
// ! We are defining the fields that will be in our collection (AKA Table)
const MessageSchema = new mongoose.Schema({
  when: {
    type: Date,
        required: true,
  },
  user: {
      type: String,
      required:true,
    },
  room: {
      type: String,
      required:true,
  },
  body:{
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Message", MessageSchema);
