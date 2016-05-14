/*
create a program 'calculator.js'
	- create a 'calculator' object with the following behaviors
		- add(x,y)
		- subtract(x,y)
		- multiply(x,y)
		- divide(x,y)

	- print the results of all the above methods for x = 100 and y = 200
*/
var calculator = {
	add : function(x,y){
		return x + y;
	},
	subtract : function(x,y){
		return x - y;
	},
	multiply : function(x,y){
		return x * y;
	},
	divide : function(x,y){
		return x / y;
	}
};

module.exports = calculator;