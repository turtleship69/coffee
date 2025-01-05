function hideChat() {
    document.getElementById("main").classList.add("hide");
    document.getElementById("conversationlist").classList.remove("hide");

    document.getElementById("placeholder").style.display = "block";
}

function showChat(event) {
    document.getElementById("main").classList.remove("hide");
    document.getElementById("conversationlist").classList.add("hide");

    document.getElementById("placeholder").style.display = "none";
}