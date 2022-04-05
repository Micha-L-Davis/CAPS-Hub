'use strict';

const eventPool = require('./events.js');
const Chance = require('chance');

const chance = new Chance();


eventPool.on('DELIVERED', (payload) => console.log(`Thank you, ${payload.customer}`));

class PickupOrder {
  constructor(storeName) {
    this.store = storeName;
    this.orderId = chance.guid();
    this.customer = chance.name();
    this.address = `${chance.city()}, ${chance.state()}`;
  }
}

setInterval(() => {
  let order = new PickupOrder(`${chance.first()}'s ${chance.word()}`);
  eventPool.emit('PICKUP', order);
}, 3000);

module.exports = PickupOrder;
