var http = require('http'),
	logger = require('./logger'),
	dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic'),
	calculatorHandler = require('./calculatorHandler'),
	notFoundHandler = require('./notFoundHandler');


var server = http.createServer(function(req, res){
	logger(req, res);
	dataParser(req, res);
	serveStatic(req, res);
	calculatorHandler(req, res);
	notFoundHandler(req, res);	
});

server.listen(8080);
console.log('server listening on port 8080..!');