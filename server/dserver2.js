const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('emergency', (formData, callback) => {
    // Process emergency data
    console.log('Received emergency data:', formData);

    // Send acknowledgment
    callback('success');
  });
});

server.listen(3003, () => {
  console.log('SERVER RUNNING');
});
