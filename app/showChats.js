// Function to convert UNIX timestamp to a human-readable string
function formatTime(unixTime) {
    const date = new Date(unixTime * 1000); // Convert seconds to milliseconds
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).replace(',', '');
}


var count;

function renderConversation(conversation) {
    // Define the gap time in seconds (5 hours)
    const TIME_GAP = 60 * 60 * 5; // 5 hours in seconds

    // Create a div element to hold the conversation
    const chatDiv = document.createElement("div");

    let lastTime = 0;
    let lastSender = null;
    let currentMessageDiv = null;
    let textDiv = null;

    conversation.forEach((msgObj, index) => {
        // console.log(msgObj);
        count = index;
        
        // Check if it's the first message or there's a gap of 5 hours
        if (index === 0 || (msgObj.time - lastTime) >= TIME_GAP) {
            if (currentMessageDiv) {
                chatDiv.appendChild(currentMessageDiv);
                currentMessageDiv = null;
            }

            // Create the time separator div
            const timeDiv = document.createElement("div");
            timeDiv.classList.add("main", "chat", "group", "time", "parent");

            const timeP = document.createElement("p");
            timeP.classList.add("main", "chat", "group", "time");
            timeP.textContent = formatTime(msgObj.time);

            timeDiv.appendChild(timeP);
            chatDiv.appendChild(timeDiv);

            // Reset lastSender so we create a new message group after time separator
            lastSender = 0;
        }

        // If this message has a different sender, or it's the first message by the sender
        if (msgObj.sender !== lastSender) {
            // Close the previous message div if it exists
            if (currentMessageDiv) {
                chatDiv.appendChild(currentMessageDiv);
            }

            // Create a new message div for the current sender
            currentMessageDiv = document.createElement("div");
            currentMessageDiv.classList.add("main", "chat", "group", "messages", "parent", msgObj.sender === null ? "sent" : "received");

            const img = document.createElement("img");
            img.classList.add("main", "chat", "group", "messages", "pfp", "bw-icon", msgObj.sender === null ? "sent" : "received");
            img.src = "account.png";

            textDiv = document.createElement("div");
            textDiv.classList.add("main", "chat", "group", "messages", "texts", msgObj.sender === null ? "sent" : "received");

            currentMessageDiv.appendChild(img);
            currentMessageDiv.appendChild(textDiv);

            lastSender = msgObj.sender; // Update the last sender
        } 

        // else {
        //     // If the sender is the same, use the existing textDiv to add new messages
        //     textDiv = document.querySelector("#texts > div > :last-child")
        // }

        // Add the message or media to the current message group
        if (!/^https?:\/\/\S+$/.test(msgObj.message)) {
            const p = document.createElement("p");
            p.classList.add("main", "chat", "group", "messages", "message", msgObj.sender === null ? "sent" : "received");
            p.textContent = msgObj.message;
            textDiv.appendChild(p);
        } else {
            const imgMedia = document.createElement("img");
            imgMedia.classList.add("main", "chat", "group", "messages", "image", msgObj.sender === null ? "sent" : "received");
            imgMedia.src = msgObj.message; // Placeholder for media image
            textDiv.appendChild(imgMedia);
        }

        // Update lastTime to the current message's time
        lastTime = msgObj.time;
    });

    // Append the last message group if it exists
    if (currentMessageDiv) {
        chatDiv.appendChild(currentMessageDiv);
    }

    return chatDiv;
}
