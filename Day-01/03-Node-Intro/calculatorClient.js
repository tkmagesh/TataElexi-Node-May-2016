var calculator = require('./calculator.js');

console.log('calculator -> ', calculator);

var x = 100,
	y = 200;
	
console.log(calculator.add(x,y));
console.log(calculator.subtract(x,y));
console.log(calculator.multiply(x,y));
console.log(calculator.divide(x,y));
