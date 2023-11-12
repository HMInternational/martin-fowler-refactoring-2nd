const { expect } = require('chai');
const { readFileSync } = require('fs');
const { statement } = require('./set-cost');

const invoices = JSON.parse(readFileSync('./chapter-01/invoices.json').toString());
const plays = JSON.parse(readFileSync('./chapter-01/plays.json').toString());

const [invoice] = invoices;
describe('statement', () => {
  it('should return expected result', () => {
    const result = statement(invoice, plays);

    expect(result).equals(
      '청구 내역 (고객명: BigCo)\n Hamlet: $650.00 (55석)\n As You Like It: $580.00 (35석)\n Othello: $500.00 (40석)\n총액: $1,730.00\n적립 포인트: 47점 \n',
    );
  });
});
