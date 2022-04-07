'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3000/caps');

const Chance = require('chance');
const chance = new Chance();

const storeName = 'acme-widgets';

let handleDelivered = (payload) => {
  console.log(`Thank you, ${payload.customer}`);
  socket.emit('received', payload);
};

let sendOrder = (order) => {
  console.log('sending order');
  socket.emit('join', order);
  socket.emit('pickup', order);
};

socket.on('join', (roomId) => console.log('You have joined the room: ', roomId));

socket.on('delivered', (payload) => handleDelivered(payload));

class PickupOrder {
  constructor(storeName) {
    this.vendorId = storeName;
    this.orderId = chance.guid();
    this.customer = chance.name();
    this.address = `${chance.city()}, ${chance.state()}`;
  }
}


socket.emit('getAll', { clientId: storeName, eventName: 'delivered' });

sendOrder(new PickupOrder(storeName));
