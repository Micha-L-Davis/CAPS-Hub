'use strict';

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3000;

const server = new Server(PORT);
const caps = server.of('/caps');

const date = new Date();

const logEvent = (event, payload) => {
  console.log(new EVENT(event, payload));
};

caps.on('connection', socket => {
  console.log('Socket connected: ' + socket.id);

  socket.on('join', (payload) => {
    socket.join(payload.vendorId);
  });

  socket.on('pickup', (payload) => {
    logEvent('pickup', payload);

    socket.to(payload.vendorId).emit('pickup', payload);
  });

  socket.on('in-transit', (payload) => {
    logEvent('in-transit', payload);

    socket.broadcast.emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    logEvent('delivered', payload);

    socket.broadcast.emit('delivered', payload);
  });
});

class EVENT {
  constructor(event, payload) {
    this.event = event;
    this.time = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}Z`;
    this.payload = payload;
  }
}
