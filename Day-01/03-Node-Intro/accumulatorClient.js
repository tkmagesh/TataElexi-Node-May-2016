var accumulator = require('./accumulator.js');
accumulator.add(100);
accumulator.subtract(50);
accumulator.multiply(10);
accumulator.divide(2);
console.log(accumulator.getResult()); //=> 250