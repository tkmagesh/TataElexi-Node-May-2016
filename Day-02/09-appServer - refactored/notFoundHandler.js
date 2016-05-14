

module.exports = function(req, res){
	console.log('responding with 404');
	res.statusCode = 404;
	res.end();
};