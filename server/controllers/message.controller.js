// !----------------- Import section for Message Controller-------------------------
const router = require("express").Router();
const Message = require("../models/message.model");
const Room = require("../models/room.model");
// Middleware we have created to check if someone is logged in
const validateSession = require("../middleware/validate-session");

// !Creating a message within a room endpoint
router.post("/create/:room", validateSession, async (req, res) => {
  try {
    // checking if the room exists
    const room = Room.findById(req.params.room);
    if (!room) {
      throw new Error(
        "You cannot post a message to a room that doesn't exist."
      );
    }
    // Preparing the message object to be saved to the database based on the Room Schema Model
    const message = new Message({
      when: new Date(),
      user: req.user._id,
      room: req.params.room,
      body: req.body.body,
    });
    // Next, we save the data
    const newMessage = await message.save();
    // Success response, status 201 message created
    res.status(201).json({
      messageForChat: newMessage,
      message: "Succesfully added a new message",
    });
  } catch (error) {
    // Error response, status 400 because client gave bad  or incompletedata.
    res.status(500).json({ message: error.message });
  }
});
// ! Update a message endpoint --------------------------------------
router.patch("/update/:id", validateSession, async (req, res) => {
  try {
    // setting filter to find the message by it's id and checking that the user own it
    let filter = { _id: req.params.id, user: req.user._id };
    // Updating the body of the message. Will not allow updates to when, user, or room of the message.
    const update = { body: req.body.body };
    const returnOptions = { new: true };
    // if the user is an admin we will change the filter to only find the message by id and will not worry about ownership
    if (req.user.isAdmin) {
      filter = { _id: req.params.id };
    }
    // using method find one and update to make the appropriate changes.
    const message = await Message.findOneAndUpdate(
      filter,
      update,
      returnOptions
    );

    // if the message is null then it doesn't exist or the user doesn't own it
    if (!message) {
      throw new Error("You don't have permission to edit this message.");
    }
    // success message
    res
      .status(202)
      .json({ message: "message updated", updatedMessage: message });
  } catch (error) {
    // error message
    res.status(500).json({ message: error.message });
  }
});

// ! Delete a message endpoint --------------------------------------
router.delete("/delete/:id", validateSession, async (req, res) => {
  try {
    // using a filter to see if the user owns the message
    let filter = { _id: req.params.id, user: req.user._id };
    // Using a different filter of the user is an admin because they will do not need to be the owner
    if (req.user.isAdmin) {
      filter = { _id: req.params.id };
    }
    // editing rights will find the message associated with the id as long as the user is the owner or an admin
    const editingRights = await Message.find(filter);
    // If they don't have editing rights an error is thrown
    if (!editingRights.length) {
      throw new Error("You do not have permission to delete this message.");
    }
    // storing the message object we want to delete
    const messageToDelete = await Message.findById({ _id: req.params.id });
    // using the method delete one to delete the message based on it's id.
    const deletedMessage = await Message.deleteOne({ _id: req.params.id });
    // response
    res.json({
      messageThatWasDeleted: messageToDelete,
      deletedMessage: deletedMessage,
      message:
        deletedMessage.deletedCount > 0
          ? "Message was deleted"
          : "Message was not removed",
    });
  } catch (error) {
    // message for server errors
    res.json({ message: error.message });
  }
});

// ! SHOW ALL Messages within a room ----------------------------------------------------------------------------------
router.get("/getall/:room", validateSession, async (req, res) => {
  try {
    // grabbing all messages within a room, showing only the username associated with the user.
    const roomMessages = await Message.find({ room: req.params.room }).populate(
      "user",
      "userName"
    );
    // success message
    res.status(202).json({
      allMessagesFromRoom: roomMessages,
      message: "Success, all messages from specified room displayed.",
    });
  } catch (error) {
    // error message if server error
    res.status(500).json({ message: error.message });
  }
});
// !Exporting router
module.exports = router;
