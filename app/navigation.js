function hideChat() {
    document.getElementById("main").classList.add("hide");
    document.getElementById("conversationlist").classList.remove("hide");
    console.log("hide");
}

function loadChat() {
    document.getElementById("main").classList.remove("hide");
    document.getElementById("conversationlist").classList.add("hide");
    console.log("show");
    //todo: load chat messages
}

document.getElementById("back").addEventListener("click", hideChat);

document.querySelectorAll("#conversations .conversation.parent").forEach(function (conversation) {
    conversation.addEventListener("click", loadChat);
});