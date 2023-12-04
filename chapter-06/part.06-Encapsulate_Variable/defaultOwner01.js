let spaceship = {};
let defaultOwner = { firstName: '마틴', lastName: '파울러' };

spaceship.owner = defaultOwner;

defaultOwner = { firstName: '레베카', lastName: '파슨스' };

module.exports = { defaultOwner };

/*
const owner2 = getDefaultOwner();
console.log('파울러', owner1.lastName, '처음 값 확인');
const owner2 = getDefaultOwner();
owner2.lastName = '파슨스';
console.log('파슨스', owner1.lastName, 'owner2를 변경한 후');
 */
