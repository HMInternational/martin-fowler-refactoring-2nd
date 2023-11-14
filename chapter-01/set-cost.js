// 공연료 청구서를 출력하는 코드
function statement(invoice, plays) {
  let totalAmount = 0;
  let totalVolumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;

  for (const aPerformance of invoice.performances) {
    const play = playFor(aPerformance, plays);
    let amount = 0;

    switch (play.type) {
      case 'tragedy': // 비극
        amount = 40000;
        if (aPerformance.audience > 30) {
          // thisAmount += 1000 * (perf.audience - 30);
          amount += 1000 * (aPerformance.audience - 30);
        }
        break;
      case 'comedy': // 희극
        amount = 30000;
        if (aPerformance.audience > 20) {
          amount += 10000 + 500 * (aPerformance.audience - 20);
        }
        amount += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }

    // 포인트를 적립한다.
    totalVolumeCredits += Math.max(aPerformance.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ('comedy' === play.type) {
      totalVolumeCredits += Math.floor(aPerformance.audience / 5);
    }
    // 청구 내역을 출력한다.
    result += ` ${play.name}: ${format(amount / 100)} (${aPerformance.audience}석)\n`;
    totalAmount += amount;
  }

  // return
  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${totalVolumeCredits}점 \n`;
  return result;
}

function playFor(aPerformance, plays) {
  return plays[aPerformance.playID];
}

module.exports = { statement };
