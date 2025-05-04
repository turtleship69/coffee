function connect_to_chat(id) {
    console.log("connecting to chat: " + id);
    socket.emit('connect_to_chat', id);
}
function send_message_to_server(message, room) { }

session = getCookie("session_id");

const socket = io(live_server_url, {
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

socket.on("inform_new_chat", function (message) {
    console.log("new chat created by " + message.name);
    console.log(message);
    //create new chat div
    new_chat_list = createConversationDiv({
        name: message.name,
        chatId: message.chatId,
        pfp: message.pfp,
        lastChat: [
            {
                message: null
            }
        ]
    });
    //add to the top of conversationListDiv
    const conversationListDiv = document.getElementById('conversations');
    conversationListDiv.insertBefore(new_chat_list, conversationListDiv.firstChild);
});