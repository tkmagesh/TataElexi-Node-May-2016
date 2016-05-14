var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer(function(req, res){
	console.log(req.method, ' - ', req.url);
	req.url = req.url === '/' ? '/index.html' : req.url;
	
	var resource = path.join(__dirname, req.url);
	fs.stat(resource, function(err, stats){
		if (err){
			res.statusCode = 404;
			res.end();
			return;
		}
		if (stats.isFile()){
			var fileContents = fs.readFileSync(resource, {encoding : 'utf8'});
			res.write(fileContents);
			res.end();
		}
	});
});
server.listen(8080);
console.log('server listening on port 8080..!');