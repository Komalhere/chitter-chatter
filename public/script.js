const socket = io("/");

const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
const backButton = document.querySelector(".header-back");

myVideo.muted = true;

let myVideoStream;

//When the back-button is pressed
backButton.addEventListener("click", () => {
  document.querySelector(".left-section").style.display = "flex";
  document.querySelector(".left-section").style.flex = "1";
  document.querySelector(".right-section").style.display = "none";
  document.querySelector(".header-back").style.display = "none";
});

//Prompt for taking the name of the client
const user = prompt("Enter your name: ");

//When the new-user/client is connected, 
//they get a unique id through peer.js
var peer = new Peer(undefined, {
  path: "/peerjs",
  host: "/",
  port: "443",
});

//For taking the audio and video of the user/client
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
  }).then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);

    //When other client is responding to our call
    peer.on("call", (call) => {
      //Other client is answering the call and sending their stream
      call.answer(stream);
      const video = document.createElement("video");
      
      //For adding their stream
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });
    
    //When a user/client is connected
    socket.on("user-connected", (userId) => {
      connectToNewUser(userId, stream);
    });
  });

//Connecting to new-user/client
const connectToNewUser = (userId, stream) => {
  
  //For calling other client and sending our stream
  const call = peer.call(userId, stream);
  const video = document.createElement("video");
  
  //For taking the stream of other client when received
  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });
};

//Emitting the socket event for the server(new-user)
peer.on("open", (id) => {
  socket.emit("join-room", ROOM_ID, id, user);
});

//Function which appends the video of clients
const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
};
