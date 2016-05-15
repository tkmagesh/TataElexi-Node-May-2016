var querystring = require('querystring'),
	calculator = require('./calculator');
	
module.exports = function(req, res, next){
	if (req.data.pathname === '/calculator'){
		var op = req.field('op'),
			n1 = parseInt(req.field('n1'), 10),
			n2 = parseInt(req.field('n2'), 10);
		try{
			var result = calculator[op](n1, n2);
			res.write(result.toString());
			res.end();	
		} catch (err){
			res.statusCode= 500;
			res.end();
		}
		
	} else {
		next();
	}
}