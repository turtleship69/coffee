function hideChat() {
    document.getElementById("main").classList.add("hide");
    document.getElementById("conversationlist").classList.remove("hide");

    document.getElementById("placeholder").style.display = "block";
}

function showChat() {
    document.getElementById("main").classList.remove("hide");
    document.getElementById("conversationlist").classList.add("hide");

    document.getElementById("placeholder").style.display = "none";

    //wait 20 ms and focus on message box
    setTimeout(() => {
        document.getElementById("messageBox").focus();
        scrollToBottom();
    }, 20);
}

scrollToBottom = function () {
    document.getElementById("texts").scrollTop = document.getElementById("texts").scrollHeight;
}