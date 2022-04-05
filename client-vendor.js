'use strict';

const eventPool = require('./events.js');
const Chance = require('chance');

const chance = new Chance();

let sendThanks = (payload) => console.log(`Thank you, ${payload.customer}`);

let sendOrder = (order) => {
  eventPool.emit('PICKUP', order);
};

eventPool.on('DELIVERED', (payload) => { sendThanks(payload); });

class PickupOrder {
  constructor(storeName) {
    this.store = storeName;
    this.orderId = chance.guid();
    this.customer = chance.name();
    this.address = `${chance.city()}, ${chance.state()}`;
  }
}

setInterval(() => {
  sendOrder(new PickupOrder(`${chance.first()}'s Shop`));
}, 3000);

module.exports = {
  sendOrder,
  sendThanks,
};
