// connect to SignalR Hub
const connection = new signalR.HubConnectionBuilder()
    .withUrl('/chathub')
    .build();

// elems
const user = document.getElementById('user');
const message = document.getElementById('message');
const chat = document.getElementById('chat');
const sendBtn = document.getElementById('sendBtn');

// Store user colors
const userColors = new Map();

// Function to generate a random color
const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

// Function to assign a color to a user if they don't have one
const assignUserColor = (username) => {
    if (!userColors.has(username)) {
        userColors.set(username, getRandomColor());
    }
    return userColors.get(username);
}

// toggle send btn state
const toggleButtonState = () => {
    sendBtn.disabled = !user.value || !message.value;
}

// debounce function
const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// on page load
toggleButtonState();
user.addEventListener('input', debounce(toggleButtonState, 300));
message.addEventListener('input', debounce(toggleButtonState, 300));

// start connection
const startConnection = async () => {
    try {
        await connection.start();
        console.log('Connected to the hub.');
    } catch (err) {
        console.error('Connection failed:', err.toString());
    }
};

startConnection();

// send message
const sendMessage = async () => {
    if (connection.state !== signalR.HubConnectionState.Connected) {
        alert('Connection to chat hub is lost. Please try again later.');
        return;
    }
    try {
        await connection.send('SendMessage', user.value, message.value);
        message.value = '';
        toggleButtonState();
    } catch (err) {
        console.error(err.toString());
    }
}

// bind send button
sendBtn.addEventListener('click', sendMessage);

// send message on pressing Enter
message.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !sendBtn.disabled) {
        sendMessage();
        event.preventDefault();
    }
});

// receive msgs from server, sanitize, DOM manipulate
connection.on('ReceiveMessage', (user, message) => {
    const newMessage = document.createElement('div');
    const usernameSpan = document.createElement('span');
    const sanitizedUser = DOMPurify.sanitize(user);
    const sanitizedMessage = DOMPurify.sanitize(message);

    const userColor = assignUserColor(sanitizedUser);  // Assign color to user

    usernameSpan.classList.add('username');
    usernameSpan.style.color = userColor; // Apply color to username
    usernameSpan.textContent = `${sanitizedUser}:`;

    const messageText = document.createTextNode(` ${sanitizedMessage}`);

    newMessage.classList.add('message');
    newMessage.appendChild(usernameSpan);
    newMessage.appendChild(messageText);

    chat.appendChild(newMessage);
    chat.scrollTop = chat.scrollHeight;
});