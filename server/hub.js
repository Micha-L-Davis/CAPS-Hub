'use strict';

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3000;

const server = new Server(PORT);
const caps = server.of('/caps');

caps.on('connection', socket => {
  console.log('Socket connected: ' + socket.id);

  socket.onAny((event, payload) => {
    console.log(new EVENT(event, payload));
  });

  socket.on('join', ({ vendorId }) => {
    socket.join(vendorId);
    socket.emit('join', vendorId);
  });

  socket.on('catch-up', () => {

  });

  socket.on('pickup', (payload) => {
    //store pickup order in the order queue
    socket.broadcast.emit('pickup', payload);
  });

  socket.on('in-transit', (payload) => {
    //store transit message in the message queue
    socket.to(payload.vendorId).emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    //store delivery message in the message queue
    socket.to(payload.vendorId).emit('delivered', payload);
  });
});

class EVENT {
  constructor(event, payload) {
    this.event = event;
    this.time = new Date();
    this.payload = payload;
  }
}
