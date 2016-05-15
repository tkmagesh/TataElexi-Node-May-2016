

module.exports = function(req, res, next){
	console.log('responding with 404');
	res.statusCode = 404;
	res.end();
	next();
};