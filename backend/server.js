const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer(app);
const io = socketIo(server);

// Adjuntar io a la app
app.set('io', io);

io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);
});
