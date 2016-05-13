var accFactory = require('./accumulator.js');

var acc1 = accFactory();
acc1.add(100);
acc1.subtract(50);
acc1.multiply(10);
acc1.divide(2);
console.log(acc1.getResult()); //=> 250

var acc2 = accFactory();
console.log(acc2.getResult());