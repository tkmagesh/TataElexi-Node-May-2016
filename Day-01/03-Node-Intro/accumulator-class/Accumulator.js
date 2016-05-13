module.exports = function Accumulator(){
	var result = 0;
	this.add = function(x){ result += x;};
	this.subtract = function(x){ result -= x;};
	this.multiply = function(x){ result *= x;};
	this.divide = function(x){ result /= x;};
	this.getResult = function(){ return result; }
}