const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = 3000;

app.use(express.static('public'));

const userStates = {};

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('user message', (msg) => {
        socket.emit('bot message', handleBotLogic(socket, msg));
    });
});

function handleBotLogic(socket, msg) {
    const id = socket.id;

    if (!userStates[id]) {
        userStates[id] = { stage: 'askName' };
    }

    const state = userStates[id];

    if (state.stage === 'askName') {
        state.name = msg;
        state.stage = 'showOptions';
        return `Hello ${state.name}! How can I assist you today:\n1. Upcoming Meetings\n2. Pending Work\n3. Leave Balance\n4. HR Contact Details`;
    } else if (state.stage === 'showOptions') {
        switch (msg) {
            case '1':
                return "📅 Upcoming Meetings:\n- 28/06/2025: Meeting with Boss regarding New Product Launch.\n- 01/07/2025: Development of Software Discussion.\n- 05/07/2025: Budget Approval Review.";
            case '2':
                return "✅ Pending Work:\n- Complete project report\n- Send feedback to manager\n- Prepare graph data\n- Assign project team\n- Finalize software modules";
            case '3':
                return "🏖️ You have 8 days of leave balance remaining.";
            case '4':
                return "📞 HR Contact: hr@company.com | +91-9876543210";
            default:
                return "❗ Please enter a valid option (1-4).";
        }
    } else {
        return "❗ Unknown stage, please refresh.";
    }
}

http.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
