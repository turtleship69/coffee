const overlay = document.getElementById("overlay");
const popup = document.getElementById("new_chat");
const new_request_button = document.getElementById("newChat");
const new_request_form = document.getElementById("new-request-form");

new_request_button.addEventListener("click", function () {
    overlay.style.display = "block";
    popup.style.display = "block";
});

function closePopup() {
    overlay.style.display = "none";
    popup.style.display = "none";
    // Reset the form fields
    //new_request_form.reset();
}

const closeButton = document.getElementById("close-button");
closeButton.addEventListener("click", closePopup);
overlay.addEventListener("click", closePopup);

new_request_form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const username = document.getElementById("username").value;

    formData = new URLSearchParams();
    formData.append('username', username);

    fetch('/new_chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
    })
        .then(response => {
            if (response.ok) {
                response.json().then(chat_info => {

                    // Handle success, e.g., show a success message or redirect
                    console.log("New chat created successfully!");
                    // Optionally, you can refresh the chat list or redirect to the new chat page
                    console.log(chat_info);
                    new_chat_list = createConversationDiv({
                        name: username,
                        chatId: chat_info.chatId,
                        pfp: chat_info.pfp,
                        lastChat: [
                            {
                                message: null
                            }
                        ]
                    });
                    //add to the top of conversationListDiv
                    conversationListDiv.insertBefore(new_chat_list, conversationListDiv.firstChild);
                })
            } else {
                // Handle error, e.g., show an error message
                console.error("Error creating new chat:", response.statusText);
            }
        })

    closePopup();
});
