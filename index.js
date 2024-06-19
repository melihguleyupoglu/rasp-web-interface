const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');  // cors paketini içe aktar

const app = express();
const server = createServer(app);

// CORS ayarlarını ekleyin
app.use(cors({
    origin: "http://localhost:8080",  // Python sunucusunun adresini belirtin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

const io = new Server(server, {
    cors: {
        origin: "http://localhost:8080",  // Python sunucusunun adresini belirtin
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        credentials: true
    }
});

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A client connected');  // Debugging message
    socket.on('pointSelected', (data) => {
        const { x, y } = data;
        console.log('Received pointSelected:', x, y);
        socket.emit('pathfindingRequest', { x, y });  // Ensure event name matches Python server
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
