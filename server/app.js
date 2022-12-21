require("dotenv").config();
const express = require("express");
const app = express();
const userController = require("./controllers/user.controller.js");
const messageController = require("./controllers/message.controller.js");
const roomController = require("./controllers/room.controller.js");


// connect to mongo database boilerplate 
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/zookeeper");
const db = mongoose.connection;

// check to see the paths are working and seeing which database we are connected to 
db.once("open", () => console.log("Connected to the database " + db.name));

// needed so we can access json objects
app.use(express.json());

// Defining our routes
// app.use setup
app.use("/user", userController);
app.use("/message", messageController);
app.use("/room", roomController);

// having server listening 
app.listen(process.env.PORT, function () {
 console.log(`YOURFILE app is listening on port ${process.env.PORT}`);
});
