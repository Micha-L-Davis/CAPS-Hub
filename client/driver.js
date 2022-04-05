'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3000/caps');

let handlePickup = (payload) => {
  console.log(`DRIVER: picked up ${payload.orderId}`);
  socket.emit('in-transit', payload);
  console.log(`DRIVER: delivered ${payload.orderId}`);
  socket.emit('delivered', payload);
};

socket.on('pickup', handlePickup);

module.exports = handlePickup;
