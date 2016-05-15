var path = require('path'),
	fs = require('fs');

var staticResourceExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.xml', '.json', '.txt'];
function isStatic(resource){
	return staticResourceExtns.indexOf(path.extname(resource)) !== -1;
}

module.exports = function(req, res, next){
	if (isStatic(req.data.pathname)){
		var resource = path.join(__dirname, req.data.pathname);
		fs.stat(resource, function(err, stats){
			if (err){
				res.statusCode = 404;
				res.end();
				return;
			}
			if (stats.isFile()){
				//fs.createReadStream(resource).pipe(res);
				var stream = fs.createReadStream(resource);
				stream.on('data', function(chunk){
					console.log('serving static resource');
					res.write(chunk);
				});
				stream.on('end', function(){
					res.end();
				});
			}
		});
	} else {
		next();
	} 
}