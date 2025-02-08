// Initialize variables
const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

// Function to add a message to the chatbox
function addMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    const p = document.createElement('p');
    p.textContent = content;
    messageDiv.appendChild(p);
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

// Function to handle user input and bot responses
function handleUserInput() {
    const message = userInput.value.trim();
    if (message === "") return;

    addMessage(message, 'user-message');
    userInput.value = '';

    // Bot response
    setTimeout(() => {
        let botResponse = "";

        if (!localStorage.getItem("userName")) {
            // Ask for user's name if not set
            botResponse = "Hey there! What's your name?";
        } else {
            const userName = localStorage.getItem("userName");
            if (!localStorage.getItem("hasGreeted")) {
                botResponse = `Hey ${userName}, how are you doing today?`;
                localStorage.setItem("hasGreeted", "true"); // Mark greeting as done
            } else {
                // Default response after greeting
                botResponse = "I'm here to chat whenever you need!";
            }
        }

        addMessage(botResponse, 'bot-message');
    }, 1000);
}

// Event listener for the send button
sendButton.addEventListener('click', () => {
    handleUserInput();
});

// Event listener for pressing "Enter" in the input field
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserInput();
    }
});

// Set up initial chat prompt
window.onload = function () {
    if (!localStorage.getItem("userName")) {
        addMessage("Hello! What's your name?", 'bot-message');
    } else {
        const userName = localStorage.getItem("userName");
        addMessage(`Hey ${userName}, how are you doing today?`, 'bot-message');
    }
};

// Ask for user's name when they first interact with the bot
chatBox.addEventListener('click', () => {
    if (!localStorage.getItem("userName")) {
        const userName = prompt("Please enter your name:");
        if (userName) {
            localStorage.setItem("userName", userName);
            addMessage(`Nice to meet you, ${userName}!`, 'bot-message');
        }
    }
});
