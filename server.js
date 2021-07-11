//Importing the modules
const express = require("express");
const app = express();
const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");

const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

const io = require("socket.io")(server, {
  cors: {
    origin: '*'
  }
});

//Port on which the server will listen
const port = process.env.PORT || 3030;

app.set("view engine", "ejs");

app.use("/peerjs", peerServer);

//Calling the public folder
app.use(express.static("public"));

//Handling get request and redirecting to a unique room-id
//Root route
app.get("/", (req, res) => {
  res.redirect(uuidv4());
});

//Creating a room-id
app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

//When socket is connected to a server
io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId, userName) => {
    
    //joining a new-user in a room(where first user is there)
    socket.join(roomId);
    
    //Sending event to all the connected clients in that room
    socket.to(roomId).emit("user-connected", userId);
    
    //Listening for message event
    socket.on("message", (message) => {
      //Sending msg to other clients in that room
      io.to(roomId).emit("createMessage", message, userName);
    });
  });
});

//Listening the server
server.listen(port , (req,res) => {
  console.log("Server is running on port: " + port);
});
