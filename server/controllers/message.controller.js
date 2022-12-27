const router = require("express").Router();
const Message = require("../models/message.model");
const Room = require("../models/room.model");
const validateSession = require("../middleware/validate-session");


// create a message within a room endpoint
router.post("/create/:room", validateSession, async (req, res) => {
    try {
        // checking if the room exists
        const room = Room.findById(req.body.room);
        if(!room){
            throw new Error("room not found");
        }
        // checking if the user is in the room
        if(!room.addedUsers.includes(req.user._id)){
            throw new Error("you're not in that room");
        }

        // preppering the message object to be saved to the database 
        const message = new Message({
            when: new Date(),
            user: req.body.user,
            room: req.params.room,
            body: req.body.body,
        });

        // we need to save the data
        const newMessage = await message.save();

        res.status(201).json({
            messageForChat: newMessage,
            message: "Succesfully added a new message"
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });   
    }
});

// Update
router.patch("/update/:id", validateSession, async (req, res) => {
    try {

        let filter = { _id: req.params.id, user: req.user._id}

        const update = req.body;
        const returnOptions = { new: true };

        if (req.user.isAdmin) {
            filter= { _id: req.params.id}
        }
        const message = await Message.findOneAndUpdate(filter, update, returnOptions);

        // if the message is null then it doesn't exist or the user doesn't own it
        if (!message){
            throw new Error("You don't have permission to edit this message.");
        }
        
        res.status(202).json({message:"message updated", updatedMessage:message})

    }
     catch (error) {
        res.status(500).json({ message: error.message });   
    }
});

// delete 
router.delete("/delete/:id", validateSession, async (req, res) => {
    try {
       let filter = {_id: req.params.id, user: req.user._id};
        if (req.user.isAdmin){
            filter = {_id: req.params.id};
        }
        const editingRights = await Message.find(filter);
        if(!editingRights.length){
            throw new Error("You do not have permission to delete this message.");
        }
        
        const messageToDelete = await Message.findById({ _id: req.params.id });
        const deletedMessage = await Message.deleteOne({ _id: req.params.id });
        res.json({
            messageThatWasDeleted: messageToDelete,
            deletedMessage: deletedMessage,
            message: deletedMessage.deletedCount > 0? "Message was deleted" : "Message was not removed"
        });
    }
     catch (error) {
        res.json({ message: error.message });   
    }
});

// ! SHOW ALL Messages within a room
router.get("/:room", validateSession, async (req, res) => {
    try {
        const roomMessages = await Message.find({room:req.params.room});
        res.status(202).json({
            allMessagesFromRoom : roomMessages, message:"Success, all messages from specified room displayed."
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
