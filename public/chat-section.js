//For adding the chat

const showChat = document.querySelector("#showChat");

//Works when width < 700px and Show Chat button is clicked
showChat.addEventListener("click", () => {
    document.querySelector(".right-section").style.display = "flex";
    document.querySelector(".right-section").style.flex = "1";
    document.querySelector(".left-section").style.display = "none";
    document.querySelector(".header-back").style.display = "block";
});

let text = document.querySelector("#input-message");
let send = document.getElementById("send");
let messages = document.querySelector(".messages");

//When send button is clicked
send.addEventListener("click", (e) => {
    if (text.value.length !== 0) {
        socket.emit("message", text.value);
        text.value = "";
        //scrollToBottom();
    }
});

//When Enter key is pressed
text.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && text.value.length !== 0) {
        socket.emit("message", text.value);
        text.value = "";
        //scrollToBottom();
    }
});

//Function for scrolling to bottom whenever a new msg is added
/*function scrollToBottom(){
    messages.scrollTop = messages.scrollHeight
}*/

//Appending the message in the chat area
socket.on("createMessage", (message, userName) => {
    messages.innerHTML =
        messages.innerHTML +
        `<div class="message">
            <b>
                <i class="far fa-user-circle"></i> 
                <span> ${userName === user ? "me" : userName
                }</span>
            </b>
            <span>${message}</span>
        </div>`;
    
});