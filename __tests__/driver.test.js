'use strict';

const eventPool = require('../events.js');
const handlePickup = require('../client/driver.js');

jest.mock('../events.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});

describe('Client Driver tests', () => {

  console.log = jest.fn();

  handlePickup({ orderId: 100 });
  it('should log the order id', () => {
    expect(console.log).toHaveBeenCalledWith('DRIVER: picked up 100');
  });

  it('should emit the IN-TRANSIT event with a payload', () => {
    expect(eventPool.emit).toHaveBeenCalledWith('IN-TRANSIT', { orderId: 100 });
  });

  it('should log the delivery', () => {
    expect(console.log).toHaveBeenCalledWith('DRIVER: delivered 100');
  });

  it('should emit the DELIVERED event with a payload', () => {
    expect(eventPool.emit).toHaveBeenCalledWith('DELIVERED', { orderId: 100 });
  });
});
