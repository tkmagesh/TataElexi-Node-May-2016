var fs = require('fs');
var fileContents = fs.readFileSync('test.txt', {encoding : 'utf8'});
console.log(fileContents);
console.log('-------------------- EOF ------------------');