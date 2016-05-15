var url = require('url');
var querystring = require('querystring');

module.exports = function(req, res, next){
	req.url = req.url === '/' ? '/index.html' : req.url;
	req.data = url.parse(req.url);
	req.query = querystring.parse(req.data.query);
	req.field = function(name){
		return req.query[name] || req.body[name];
	};
	
	if (req.method === 'POST'){
		var rawReqData = '';
		req.on('data', function(chunk){
			rawReqData += chunk;
		});
		req.on('end', function(){
			req.body = querystring.parse(rawReqData);
			next();
		});
	}
	else {
		next();
	}
};