var http = require('http');
var server = http.createServer(function(req, res){
	/*
	req.url -> resources requested
	look at file system api to know how to check if file exists
	if (file not found)
		res.statusCode = 404;
		res.end()
	*/
	res.write('<h1>Welcome to node.js</h1>');
	res.end();
});
server.listen(8080);
console.log('server listening on port 8080..!');