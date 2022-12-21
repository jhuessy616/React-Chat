const router = require("express").Router();
const Room = require("../models/room.model");

router.post("/create", async (req, res) => {
    try {
        // preppering the room object to be saved to the database 
        const room = new Room({
            name: req.body.name,
            description: req.body.description,
            addedUsers: req.body.addedUsers,
        })
        // we need to save the data, do that by using .save()
        const newRoom = await room.save();

        res.status(201).json({
            rooomCreated: newRoom,
            message: "Succesfully added a new room"
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });   
    }
})


// ! SHOW ALL ROOMS
router.get("/", async (req, res) => {
    try {
        const room = await Room.find();
        res.status(202).json({
            allRooms : room, message:"Success, all rooms displayed"
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message });   
    }
})

// Update
router.patch("/update/:id", async (req, res) => {
    try {
        const filter = { _id: req.params.id }

        const update = req.body;
        const returnOptions = { new: true };

        const room = await Room.findOneAndUpdate(filter, update, returnOptions);
        
        res.status(202).json({message:"room updated", updatedRoom:room})

    }
     catch (error) {
        res.status(500).json({ message: error.message });   
    }
})

// delete 
router.delete("/delete/:id", async (req, res) => {
    try {
        const roomToDelete = await Room.findById({ _id: req.params.id });
        const deletedRoom = await Room.deleteOne({ _id: req.params.id });
        res.json({
        roomThatWasDeleted: roomToDelete,
        deletedRoom: deletedRoom,
        message: deletedRoom.deletedCount > 0? "Room was deleted" : "Room was not removed"});

    }
     catch (error) {
        res.json({ message: error.message });   
    }
})
module.exports = router;