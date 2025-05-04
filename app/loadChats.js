// Select the parent div where the conversation will be appended
const conversationListDiv = document.getElementById('conversations');

function createConversationDiv(chat) {
    // Create the parent div for each conversation
    const conversationDiv = document.createElement('div');
    conversationDiv.classList.add('conversationlist', 'conversations', 'conversation', 'parent');
    conversationDiv.id = chat.chatId;

    // Create the image element
    const img = document.createElement('img');
    img.classList.add('conversationlist', 'conversations', 'conversation', 'pfp', 'bw-icon');
    console.log(chat.pfp);
    img.src = chat.pfp;
    img.alt = 'profile picture';

    // Create the text div
    const textDiv = document.createElement('div');
    textDiv.classList.add('conversationlist', 'conversations', 'conversation', 'text');

    // Create the name paragraph
    const nameP = document.createElement('p');
    nameP.classList.add('conversationlist', 'conversations', 'conversation', 'name');
    nameP.textContent = chat.name;

    // Create the message preview paragraph
    const previewP = document.createElement('p');
    previewP.classList.add('conversationlist', 'conversations', 'conversation', 'preview');

    // Determine the sender and message format
    const senderName = chat.lastChat[0].sender === null ? "You" : chat.lastChat[0].sender;
    const messagePreview = chat.lastChat[0].message === null ? "New Chat" : `${senderName}: ${chat.lastChat[0].message}`;
    previewP.textContent = messagePreview;

    // Append the name and preview to the text div
    textDiv.appendChild(nameP);
    textDiv.appendChild(previewP);

    // Append the image and text divs to the parent div
    conversationDiv.appendChild(img);
    conversationDiv.appendChild(textDiv);


    conversationDiv.addEventListener("click", (event) => {
        // event.stopPropagation();

        fetch(`/chats/${chat.chatId}.json`)
            .then(response => response.json())
            .then(data => {
                current_room = chat.chatId;

                const chatDiv = renderConversation(data);

                // document.getElementById("texts").innerHTML = "";
                document.getElementById("texts").innerHTML = "";
                document.getElementById("texts").appendChild(chatDiv);
                document.getElementById("name").innerText = chat.name;

                showChat();


                connect_to_chat(chat.chatId);
            })
            .catch(error => console.error('Error loading conversation:', error));
    });

    // Return the generated div
    return conversationDiv;
}

let current_room;

function loadChatList() {
    // Make a request to /chatlist.json
    fetch('/chatlist.json')
        .then(response => response.json())
        .then(data => {
            // Loop through each chat item in the response
            data.forEach(chat => {
                const conversationDiv = createConversationDiv(chat);

                conversationListDiv.appendChild(conversationDiv);


            });


            document.getElementById("back").addEventListener("click", hideChat);
            //add event listener to esc
            document.addEventListener("keydown", (event) => {
                if (event.key === "Escape") {
                    hideChat();
                }
            });
        })
        .catch(error => console.error('Error loading chat list:', error));
}

// Call the function to load the chat list
loadChatList();