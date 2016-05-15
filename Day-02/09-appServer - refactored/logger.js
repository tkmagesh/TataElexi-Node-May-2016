var chalk = require('chalk');
module.exports = function(req, res, next){
	console.log(chalk.yellow(req.method, ' - ', req.url));
	next();
};