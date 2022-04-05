'use strict';

const eventPool = require('./events.js');

let handlePickup = (payload) => {
  console.log(`DRIVER: picked up ${payload.orderId}`);
  eventPool.emit('IN-TRANSIT', payload);
  console.log(`DRIVER: delivered ${payload.orderId}`);
  eventPool.emit('DELIVERED', payload);
};

eventPool.on('PICKUP', handlePickup);

module.exports = handlePickup;
