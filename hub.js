'use strict';

const eventPool = require('./events.js');
const clientDriver = require('./client-driver.js');
const ClientVendor = require('./client-vendor.js');


let date = new Date();

eventPool.on('PICKUP', (payload) => logEvent('pickup', payload));
eventPool.on('IN-TRANSIT', (payload) => logEvent('in-transit', payload));
eventPool.on('DELIVERED', (payload) => logEvent('delivered', payload));

const logEvent = (event, payload) => {
  console.log(new EVENT(event, payload));
};


class EVENT {
  constructor(event, payload) {
    this.event = event;
    this.time = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}Z`;
    this.payload = payload;
  }
}
