// !----------------- Import section for Room Controller-------------------------
const router = require("express").Router();
const Room = require("../models/room.model");
// Middleware we have created to check if someone is logged in
const validateSession = require("../middleware/validate-session");
// Additional middleware we are using to check if the user is an admin.
const adminCheck = require("../middleware/adminCheck");

// !Endpoint that will create a room
router.post("/create", validateSession, async (req, res) => {
  try {
    // Preparing the room object to be saved to the database based on the Room Schema Model
    const room = new Room({
      name: req.body.name,
      description: req.body.description,
      addedUsers: req.body.addedUsers,
    });
    // we need to save the data, do that by using .save()
    const newRoom = await room.save();
    // Success response
    res.status(201).json({
      rooomCreated: newRoom,
      message: "Succesfully added a new room",
    });
  } catch (error) {
    // Error response. status 400 because the client gave bad or incomplete data
    res.status(400).json({ message: error.message });
  }
});

// ! SHOW ALL ROOMS --------------------------------------------------------
router.get("/", validateSession, async (req, res) => {
  try {
    // finding all rooms
    const room = await Room.find();
    // success response
    res.status(200).json({
      allRooms: room,
      message: "Success, all rooms displayed",
    });
  } catch (error) {
    // server error message
    res.status(500).json({ message: error.message });
  }
});
// ! Update a room endpoint --------------------------------------
// Using adminCheck because only admins can update rooms
router.patch("/update/:id", adminCheck, async (req, res) => {
  try {
    // setting filter to find the rrom by it's id.
    const filter = { _id: req.params.id };
    // Updating the room.
    const update = req.body;
    const returnOptions = { new: true };
    // using method find one and update to make the appropriate changes.
    const room = await Room.findOneAndUpdate(filter, update, returnOptions);
    // success response
    res.status(202).json({ message: "room updated", updatedRoom: room });
  } catch (error) {
    // error response
    res.status(500).json({ message: error.message });
  }
});

// ! Delete a room endpoint --------------------------------------
// Using adminCheck because only admins can delete rooms
router.delete("/delete/:id", adminCheck, async (req, res) => {
  try {
    // storing the room object we want to delete
    const roomToDelete = await Room.findById({ _id: req.params.id });
    // using the method delete one to delete the message based on it's id.
    const deletedRoom = await Room.deleteOne({ _id: req.params.id });
    // response
    res.json({
      roomThatWasDeleted: roomToDelete,
      deletedRoom: deletedRoom,
      message:
        deletedRoom.deletedCount > 0
          ? "Room was deleted"
          : "Room was not removed",
    });
  } catch (error) {
    // message for server errors
    res.json({ message: error.message });
  }
});
// !Exporting router
module.exports = router;
