const messageBox = document.getElementById("messageBox");


function submitMessage(event) {
    event.preventDefault();
    sendMessage()
}

function sendMessage() { //placeholder function, log message and clear input
    const message = messageBox.value;
    if (message.trim() === "") return;

    console.log("message: " + message); // Log the message to the console

    send_message_to_server(message, current_room); // Call the function to send the message to the server
    
    addMessageToDiv(document.getElementById("texts"), {
        message: message, time: Math.floor(Date.now() / 1000), sender: null 
    }); // Add the message to the chat window
    scrollToBottom();
    
    //update chat list
    conversation_list = document.getElementById("conversations");
    conversation = document.getElementById(current_room);
    //move conversation to the be the top child of conversation_list
    conversation_list.insertBefore(conversation, conversation_list.firstChild);

    conversation.querySelector(".preview").textContent = message; //update last message in conversation list

    messageBox.value = "";
}