const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { readFile } = require('fs/promises');
const { createCanvas } = require('canvas');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('public')); // Serve all static files from the 'public' directory

io.on('connection', (socket) => {
    socket.on('pointSelected', async (data) => {
        const { x, y } = data;
        console.log(x, y);
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
