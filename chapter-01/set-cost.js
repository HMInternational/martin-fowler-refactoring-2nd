// 공연료 청구서를 출력하는 코드
function statement(invoiceData, plays) {
  const invoiceResult = calculateAndGetInvoice(invoiceData, plays);
  return formatPlainText(invoiceResult);
}

function formatPlainText(invoiceResult) {
  let result = `청구 내역 (고객명: ${invoiceResult.customer})\n`;
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;
  for (const aPerformance of invoiceResult.performances) {
    // 청구 내역을 출력한다.
    result += ` ${aPerformance.name}: ${format(aPerformance.amount / 100)} (${aPerformance.audience}석)\n`;
  }

  // return
  result += `총액: ${format(invoiceResult.totalAmount / 100)}\n`;
  result += `적립 포인트: ${invoiceResult.totalVolumeCredits}점 \n`;
  return result;
}

// 서버스 메서드
function calculateAndGetInvoice(invoiceData, plays) {
  const invoice = createInvoice(invoiceData, plays);
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
  switch (play.type) {
    case 'tragedy':
      return new Tragedy(performanceData.audience, play.name);
    case 'comedy':
      return new Comedy(performanceData.audience, play.name);
    default:
      throw new Error(`알 수 없는 장르: ${play.type}`);
  }
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

/**
 *  @abstract
 */
class IPerformance {
  /**
   *  @abstract
   */
  volumeCredits() {
    throw new Error('서브클래스에서 구현해야 합니다.');
  }

  /**
   *  @abstract
   */
  amount() {
    throw new Error('서브클래스에서 구현해야 합니다.');
  }
}

class Tragedy extends IPerformance {
  audience;
  name;
  type = 'tragedy';

  constructor(audience, name) {
    super();
    this.audience = audience;
    this.name = name;
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

class Comedy extends IPerformance {
  audience;
  name;
  type = 'comedy';

  constructor(audience, name) {
    super();
    this.audience = audience;
    this.name = name;
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

class Performance extends IPerformance {
  audience;
  name;
  type;

  constructor(audience, name, type) {
    super();
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
