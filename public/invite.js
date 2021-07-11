//For sending the invite link

const inviteButton = document.querySelector("#invite-button");

//When the invite-button is clicked
inviteButton.addEventListener("click", (e) => {
    prompt(
        "Send this link to your peer: ", window.location.href
    );
});