//Adds muting and unmuting to the video chat

const muteButton = document.querySelector("#mute-button");

//When mute-unmute button is pressed
muteButton.addEventListener("click", () => {
    const audioEnabled = myVideoStream.getAudioTracks()[0].enabled;

    if (audioEnabled) {
        //To allow the user to turn their audio tracks off:
        myVideoStream.getAudioTracks()[0].enabled = false;
        changeHtml = `<i class="fas fa-microphone-slash" title="Unmute"></i>`;
        muteButton.classList.toggle("change-background");
        muteButton.innerHTML = changeHtml;
    }
    else {
        //To allow the user to turn their audio tracks back on
        myVideoStream.getAudioTracks()[0].enabled = true;
        changeHtml = `<i class="fas fa-microphone" title="Mute"></i>`;
        muteButton.classList.toggle("change-background");
        muteButton.innerHTML = changeHtml;
    }
});