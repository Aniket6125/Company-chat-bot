const socket = io();
const messages = document.getElementById('messages');
const form = document.getElementById('chatForm');
const input = document.getElementById('m');

window.onload = () => {
    input.focus();
    addBotMessage("Please enter your Name or Company ID Number :");
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        addUserMessage(input.value);
        socket.emit('user message', input.value);
        input.value = '';
    }
});

socket.on('bot message', (msg) => {
    addBotMessage(msg);
});

function addUserMessage(msg) {
    const item = document.createElement('li');
    item.textContent = msg;
    item.className = 'user';
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
}

function addBotMessage(msg) {
    const item = document.createElement('li');
    item.className = 'bot';
    item.innerHTML = msg.replace(/\n/g, '<br>');
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
}
