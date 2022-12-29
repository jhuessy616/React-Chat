const mongoose = require("mongoose");
// ! We are defining the fields that will be in our collection (AKA Table)
const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
        unique:true,
  },
  description: {
    type: String,
  },
  addedUsers:{
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Room", RoomSchema);
