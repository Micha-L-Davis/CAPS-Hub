
const eventPool = require('../events.js');
const { sendOrder, sendThanks } = require('../client/vendor');

jest.mock('../events.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});

describe('testing the vendor client', () => {

  console.log = jest.fn();

  it('should emit the pickup event with an order in the payload', () => {
    sendOrder('fries');

    expect(eventPool.emit).toHaveBeenCalledWith('PICKUP', 'fries');
  });

  it('should log a message to the console thanking the customer', () => {
    sendThanks({ customer: 'Tester Testington' });

    expect(console.log).toHaveBeenCalledWith('Thank you, Tester Testington');
  });
});
