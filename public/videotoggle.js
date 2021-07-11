//To turn their video on and off during video chat

const stopVideo = document.querySelector("#stop-video");

//when the stop-video button is clicked
stopVideo.addEventListener("click", () => {
    const videoEnabled = myVideoStream.getVideoTracks()[0].enabled;
    
    if (videoEnabled) {    
        //To allow the user to turn their video tracks off:
        myVideoStream.getVideoTracks()[0].enabled = false;
        
        changeHtml = `<i class="fas fa-video-slash" title="Turn camera on"></i>`;
        stopVideo.classList.toggle("change-background");
        stopVideo.innerHTML = changeHtml;
    }
    else {
        //To allow the user to turn their video tracks back on:
        myVideoStream.getVideoTracks()[0].enabled = true;
        
        changeHtml = `<i class="fas fa-video" title="Turn camera off"></i>`;
        stopVideo.classList.toggle("change-background");
        stopVideo.innerHTML = changeHtml;
    }
});