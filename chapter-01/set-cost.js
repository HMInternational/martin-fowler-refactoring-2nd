// 공연료 청구서를 출력하는 코드
function statement(invoiceData, plays) {
  const invoice = createInvoice(invoiceData, plays);

  const totalAmount = invoice.totalAmount();
  const totalVolumeCredits = invoice.totalVolumeCredits();
  const invoiceDto = calculateAndGetDto(invoice);

  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;
  for (const aPerformance of invoice.performances) {
    // 청구 내역을 출력한다.
    result += ` ${aPerformance.name}: ${format(aPerformance.amount() / 100)} (${aPerformance.audience}석)\n`;
  }

  // return
  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${totalVolumeCredits}점 \n`;
  return result;
}

function calculateAndGetDto(invoice) {
  return {
    customer: invoice.customer,
    totalAmount: invoice.totalAmount(),
    totalVolumeCredits: invoice.totalVolumeCredits(),
    performances: invoice.performances.map((aPerformance) => {
      return {
        name: aPerformance.name,
        amount: aPerformance.amount(),
        audience: aPerformance.audience,
      };
    }),
  };
}

function createInvoice(invoiceData, plays) {
  const customer = invoiceData.customer;
  const performances = invoiceData.performances.map((performance) => createPerformance(performance, plays));
  return new Invoice(customer, performances);
}

function createPerformance(performanceData, plays) {
  const play = playFor(performanceData, plays);
  return new Performance(performanceData.audience, play.name, play.type);
}

function playFor(aPerformance, plays) {
  return plays[aPerformance.playID];
}

class Invoice {
  customer;
  performances;

  constructor(customer, performances) {
    this.customer = customer;
    this.performances = performances;
  }

  totalVolumeCredits() {
    let totalVolumeCredits = 0;
    for (const aPerformance of this.performances) {
      // 포인트를 적립한다.
      totalVolumeCredits += aPerformance.volumeCredits();
    }
    return totalVolumeCredits;
  }

  totalAmount() {
    let totalAmount = 0;
    for (const aPerformance of this.performances) {
      totalAmount += aPerformance.amount();
    }
    return totalAmount;
  }
}

class Performance {
  audience;
  name;
  type;

  constructor(audience, name, type) {
    this.audience = audience;
    this.name = name;
    this.type = type;
  }

  volumeCredits() {
    let volumeCredits = Math.max(this.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ('comedy' === this.type) {
      volumeCredits += Math.floor(this.audience / 5);
    }
    return volumeCredits;
  }

  amount() {
    let amount = 0;

    switch (this.type) {
      case 'tragedy': // 비극
        amount = 40000;
        if (this.audience > 30) {
          // thisAmount += 1000 * (perf.audience - 30);
          amount += 1000 * (this.audience - 30);
        }
        break;
      case 'comedy': // 희극
        amount = 30000;
        if (this.audience > 20) {
          amount += 10000 + 500 * (this.audience - 20);
        }
        amount += 300 * this.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${this.type}`);
    }
    return amount;
  }
}

module.exports = { statement };
