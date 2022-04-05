'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3000/caps');

const Chance = require('chance');

const chance = new Chance();

let handleDelivered = (payload) => console.log(`Thank you, ${payload.customer}`);

let sendOrder = (order) => {
  console.log('sending order');
  socket.emit('join', order);
  socket.emit('pickup', order);
};

socket.on('delivered', (payload) => { handleDelivered(payload); });

class PickupOrder {
  constructor(storeName) {
    this.vendorId = chance.guid();
    this.store = storeName;
    this.orderId = chance.guid();
    this.customer = chance.name();
    this.address = `${chance.city()}, ${chance.state()}`;
  }
}


sendOrder(new PickupOrder(`${chance.first()}'s Shop`));
