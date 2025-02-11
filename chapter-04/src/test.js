class Province {
  constructor(doc) {
    this._name = doc.name;
    this._producers = [];
    this._totalProduction = 0;
    this._demand = doc._demand;
    this._price = doc.price;
    doc._producers.forEach((d) => this.addProducer(new Producer(this, d)));
  }

  // 데이터에 대한 접근자
  get name() {
    return this._name;
  }

  get producers() {
    return this._producers;
  }

  get totalProduction() {
    return this._totalProduction;
  }

  set totalProduction(arg) {
    this._totalProduction = arg;
  }

  get demand() {
    return this._demand;
  }

  set demand(arg) {
    this._demand = parseInt(arg); // 숫자로 파싱해서 저장
  }

  get price() {
    return this._price;
  }

  set price(arg) {
    this._price = parseInt(arg); // 숫자로 파싱해서 저장
  }

  // 생산 부족분을 계산하는 코드
  get shortfall() {
    return this._demand - this.totalProduction;
  }

  // 수익을 계산하는 코드
  get profit() {
    return this.demandValue - this.demandCost;
  }

  get demandValue() {
    return this.satisfiedDemand * this.price;
  }

  get satisfiedDemand() {
    return Math.min(this._demand, this.totalProduction);
  }

  get demandCost() {
    let remainingDemand = this.demand;
    let result = 0;
    this.producers
      .sort((a, b) => a.cost - b.cost)
      .forEach((p) => {
        const contribution = Math.min(remainingDemand, p.production);
        remainingDemand -= contribution;
        result += contribution * p.cost;
      });
    return result;
  }

  addProducer(arg) {
    this._producers.push(arg);
    this._totalProduction += arg.production;
  }
}

class Producer {
  constructor(aProvince, data) {
    this._province = aProvince;
    this._cost = data.cost;
    this._name = data.name;
    this._production = data.production || 0;
  }

  get name() {
    return this._name;
  }

  get cost() {
    return this._cost;
  }

  set cost(arg) {
    this._cost = parseInt(arg);
  }

  get production() {
    return this._production;
  }

  set production(amountStr) {
    const amount = parseInt(amountStr);
    const newProduction = Number.isNaN(amount) ? 0 : amount; // 숫자형이 아니라면 0
    this._province.totalProduction += newProduction - this._production;
    this._production = newProduction;
  }
}

// JSON 데이터 생성
function sampleProvinceData() {
  return {
    name: 'Asia',
    producers: [
      { name: 'Byzantium', cost: 10, production: 9 },
      { name: 'Attalia', cost: 12, production: 10 },
      { name: 'Sinope', cost: 10, production: 6 },
    ],
    demand: 30,
    price: 20,
  };
}

console.log('test 10000000000');

module.exports = {
  Province,
  sampleProvinceData,
};
