function createConversationDiv(chat) {
    // Create the parent div for each conversation
    const conversationDiv = document.createElement('div');
    conversationDiv.classList.add('conversationlist', 'conversations', 'conversation', 'parent');
    conversationDiv.id = chat.chatId;

    // Create the image element
    const img = document.createElement('img');
    img.classList.add('conversationlist', 'conversations', 'conversation', 'pfp', 'bw-icon');
    img.src = chat.pfp;

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
    const messagePreview = `${senderName}: ${chat.lastChat[0].message}`;
    previewP.textContent = messagePreview;

    // Append the name and preview to the text div
    textDiv.appendChild(nameP);
    textDiv.appendChild(previewP);

    // Append the image and text divs to the parent div
    conversationDiv.appendChild(img);
    conversationDiv.appendChild(textDiv);

    // Return the generated div
    return conversationDiv;
}

function loadChatList() {
    // Make a request to /chatlist.json
    fetch('/chatlist.json')
        .then(response => response.json())
        .then(data => {
            // Select the parent div where the conversation will be appended
            const conversationListDiv = document.getElementById('conversations');

            // Loop through each chat item in the response
            data.forEach(chat => {
                const conversationDiv = createConversationDiv(chat);

                conversationListDiv.appendChild(conversationDiv);
            });


            document.getElementById("back").addEventListener("click", hideChat);
            document.querySelectorAll("#conversations .conversation.parent").forEach(function (conversation) {
                conversation.addEventListener("click", loadChat);
            });
        })
        .catch(error => console.error('Error loading chat list:', error));
}

// Call the function to load the chat list
loadChatList();
