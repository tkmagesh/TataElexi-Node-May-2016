var fs = require('fs');

var stream = fs.createReadStream('test.txt', {encoding : 'utf8'});
// ReadableStream 
// events - open, data, end, close, error

stream.pipe(process.stdout);

var readCount = 0;
stream.on('data', function(chunk){
	++readCount;
});
stream.on('end', function(){
	console.log('-------------------- EOF ------------------');
	console.log('Read Count = ', readCount);
});
stream.on('error', function(err){
	console.log('something went wrong!!');
});