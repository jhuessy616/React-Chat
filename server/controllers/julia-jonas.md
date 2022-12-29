 
 Rob had us remove this because unsure what added users was meant to do.
 // checking if the user is in the room
        if(!room.addedUsers.includes(req.user._id)){
            throw new Error("you're not in that room");
        }