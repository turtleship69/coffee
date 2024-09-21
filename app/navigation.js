function hideChat() {
    document.getElementById("main").classList.add("hide");
    document.getElementById("conversationlist").classList.remove("hide");
    console.log("hide");
}

function loadChat(event) {
    document.getElementById("main").classList.remove("hide");
    document.getElementById("conversationlist").classList.add("hide");
    console.log("show");
    console.log(event.currentTarget.id);
    //todo: load chat messages
}