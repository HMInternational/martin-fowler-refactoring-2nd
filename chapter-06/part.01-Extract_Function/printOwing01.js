function printOwing(invoice, Clock) {
  let outstanding = 0;
  console.log('***********************');
  console.log('**** 고객 채무 ****');
  console.log('***********************');

  // 미해결 채무(outstanding)를 계산
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  // 마감일(dueDate)을 기록한다.
  const today = Clock.today;
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

  // 세부 사항을 출력한다.
  console.log(`고객명: ${invoice.customer}`);
  console.log(`채무액: ${outstanding}`);
  console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
}

module.exports = printOwing;
