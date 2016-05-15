var path = require('path'),
	fs = require('fs');

var staticResourceExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.xml', '.json', '.txt'];
function isStatic(resource){
	return staticResourceExtns.indexOf(path.extname(resource)) !== -1;
}

var cache = {

};

function getResource(resource, onResult){
	if (typeof cache[resource] === 'undefined'){
		fs.readFile(resource, function(err, fileContents){
			if (err){
				return onResult(err, null);
			}
			cache[resource] = fileContents;
			return onResult(null, fileContents);
		})
	} else {
		onResult(null, cache[resource]);
	}
}
function handleError(res, err){
	res.statusCode = 404;
	res.end();
};

module.exports = function(resourcePath){
	return function(req, res, next){
		if (isStatic(req.data.pathname)){
			var resource = path.join(resourcePath, req.data.pathname);
			fs.stat(resource, function(err, stats){
				if (err){
					return handleError(err, res);
				}
				if (stats.isFile()){
					getResource(resource, function(err, fileContents){
						if (err){
							return handleError(err, res);
						}
						res.write(fileContents);
						res.end();
					});
				}
			});
		} else {
			next();
		} 
	}
}