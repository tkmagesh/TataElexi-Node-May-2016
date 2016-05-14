var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator');

var staticResourceExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.xml', '.json', '.txt'];
function isStatic(resource){
	return staticResourceExtns.indexOf(path.extname(resource)) !== -1;
}

var server = http.createServer(function(req, res){
	console.log(req.method, ' - ', req.url);
	req.url = req.url === '/' ? '/index.html' : req.url;
	var urlObj = url.parse(req.url);
	if (isStatic(urlObj.pathname)){
		var resource = path.join(__dirname, req.url);
		fs.stat(resource, function(err, stats){
			if (err){
				res.statusCode = 404;
				res.end();
				return;
			}
			if (stats.isFile()){
				fs.createReadStream(resource).pipe(res);
			}
		});
	} else if (urlObj.pathname === '/calculator'){
		var data = querystring.parse(urlObj.query);
		var op = data.op,
			n1 = parseInt(data.n1, 10),
			n2 = parseInt(data.n2, 10);
		var result = calculator[op](n1, n2);
		res.write(result.toString());
		res.end();
	} else {
		res.write('coming soon');
		res.end();
	}
});
server.listen(8080);
console.log('server listening on port 8080..!');