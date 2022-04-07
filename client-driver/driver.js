'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3000/caps');

socket.on('join', (roomId) => console.log('You have joined the room: ', roomId));

let handlePickup = (payload) => {
  console.log(`DRIVER: picked up ${payload.orderId}`);
  socket.emit('join', { vendorId: payload.vendorId });
  socket.emit('received', payload);

  socket.emit('in-transit', payload);

  setTimeout(() => {
    console.log(`DRIVER: delivered ${payload.orderId}`);
    socket.emit('delivered', payload);
  }, 2000);
};

socket.on('pickup', payload => handlePickup(payload));

socket.emit('getAll', { clientId: 'drivers', eventName: 'pickup' });

module.exports = handlePickup;
