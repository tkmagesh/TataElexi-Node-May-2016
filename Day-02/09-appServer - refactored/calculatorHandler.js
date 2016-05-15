var querystring = require('querystring'),
	calculator = require('./calculator');
	
module.exports = function(req, res, next){
	if (req.data.pathname === '/calculator' && req.method === 'GET'){
		var reqData = querystring.parse(req.data.query);
		var op = reqData.op,
			n1 = parseInt(reqData.n1, 10),
			n2 = parseInt(reqData.n2, 10);
		try{
			var result = calculator[op](n1, n2);
			res.write(result.toString());
			res.end();	
		} catch (err){
			res.statusCode= 500;
			res.end();
		}
		
	} else if (req.data.pathname === '/calculator' && req.method === 'POST'){
		var rawReqData = '';
		req.on('data', function(chunk){
			rawReqData += chunk;
		});
		req.on('end', function(){
			var reqData = querystring.parse(rawReqData);
			var op = reqData.op,
				n1 = parseInt(reqData.n1, 10),
				n2 = parseInt(reqData.n2, 10);
			try{
				var result = calculator[op](n1, n2);
				res.write(result.toString());
				res.end();	
			} catch (err){
				res.statusCode= 500;
				res.end();
			}	
		});
	} else {
		next();
	}
}