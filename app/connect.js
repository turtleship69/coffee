function connect_to_chat(id) { }
function send_message_to_server(message, room) { }


session = getCookie("session_id");

const socket = io(window.location.host, {
    auth: {
        token: session
    },
});

socket.on('connect', function () {
    socket
        .on('authenticated', function () {
            //do other things
            console.log('authenticated');
        })

    if (current_room) {
        connect_to_chat(current_room);
        console.log("connected to chat: " + current_room);
    } else {
        console.log("no current room to connect to");
    }
});

connect_to_chat = function (id) {
    socket.emit('connect_to_chat', id);
}

send_message_to_server = function (message, room) {
    socket.emit('message', { "message": message, "chat_id": room });
}

socket.on("incoming_message", function (message) {
    console.log("received");
    console.log(message);

    addMessageToDiv(document.getElementById("texts"), {
        message: message.message,
        time: Math.floor(Date.now() / 1000),
        sender: message.sender
    });

    scrollToBottom();

    //update chat list
    conversation_list = document.getElementById("conversations");
    conversation = document.getElementById(current_room);
    //move conversation to the be the top child of conversation_list
    conversation_list.insertBefore(conversation, conversation_list.firstChild);

    conversation.querySelector(".preview").textContent = message.message;
});

