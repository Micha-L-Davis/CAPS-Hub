'use strict';

const Chance = require('chance');
const { Server } = require('socket.io');
const Queue = require('./lib/queue');

const PORT = process.env.PORT || 3000;
const server = new Server(PORT);
const caps = server.of('/caps');

const messageQueues = new Queue();

const chance = new Chance();

caps.on('connection', socket => {
  console.log('Socket connected: ' + socket.id);

  socket.onAny((event, payload) => {
    console.log(new EVENT(event, payload));
  });

  socket.on('join', ({ vendorId }) => {
    socket.join(vendorId);
    if (!messageQueues.read(vendorId)) {
      messageQueues.store(vendorId, new Queue());
    }
    socket.emit('join', vendorId);
  });

  socket.on('getAll', ({ clientId, eventName }) => {

    let currentQueue = messageQueues.read(clientId);
    if (!currentQueue) {
      console.log('No message queue found');
    } else {
      Object.keys(currentQueue.data).forEach(messageId => {
        socket.emit(eventName, currentQueue.data[messageId]);
      });
    }
  });

  socket.on('received', (payload) => {
    let currentQueue = messageQueues.read(payload.vendorId);
    let message = currentQueue.remove(payload.orderId);

    socket.emit('received', message);
  });

  socket.on('pickup', (payload) => {
    enqueueMessage(payload, 'drivers');

    socket.broadcast.emit('pickup', payload);
  });

  socket.on('in-transit', (payload) => {
    enqueueMessage(payload, payload.vendorId);

    socket.to(payload.vendorId).emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    enqueueMessage(payload, payload.vendorId);

    socket.to(payload.vendorId).emit('delivered', payload);
  });
});

function enqueueMessage(payload, queueId) {
  let currentQueue = messageQueues.read(queueId);

  if (!currentQueue) {
    let queueKey = messageQueues.store(queueId, new Queue());
    currentQueue = messageQueues.read(queueKey);
  }

  currentQueue.store(payload.orderId, payload);

  return payload.orderId;
}

class EVENT {
  constructor(event, payload) {
    this.event = event;
    this.time = new Date();
    this.payload = payload;
  }
}
