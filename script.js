document.addEventListener("DOMContentLoaded", () => {
    loadApiKey();
});

async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return;
    
    appendMessage("You", userInput);
    document.getElementById("user-input").value = "";
    
    const apiKey = localStorage.getItem("OPENAI_API_KEY");
    if (!apiKey) {
        appendMessage("Bot", "API key is missing. Set it first.");
        return;
    }
    
    const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: userInput,
            max_tokens: 100
        })
    });
    
    const data = await response.json();
    appendMessage("Bot", data.choices[0].text.trim());
}

function appendMessage(sender, message) {
    const chatBox = document.getElementById("chat-box");
    const messageElement = document.createElement("p");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function loadApiKey() {
    const apiKey = localStorage.getItem("OPENAI_API_KEY");
    if (!apiKey) {
        const key = prompt("Enter your OpenAI API Key:");
        if (key) localStorage.setItem("OPENAI_API_KEY", key);
    }
}
