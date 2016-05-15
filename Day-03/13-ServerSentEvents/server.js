  var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
    if (req.url === '/' || req.url === '/index.html'){
        fs.createReadStream('index.html').pipe(res);
    } else if (req.url === '/stream'){
        res.writeHead(200, {
            'content-type' : 'text/event-stream',
            'connection' : 'keep-alive',
            'Access-Control-Allow-Origin' : '*'
        });
        fs.watchFile('index.html', function(){
            res.write('event: fileChange\n');
            res.write('data: index.html changed at ' + new Date().toString() + '\n\n');
        });
        setInterval(function(){
            res.write('event: message\n');
            res.write('data: ' + new Date().toString() + '\n\n');
        },3000);
    }
});
server.listen(9090);
console.log('server listening on port 9090');
