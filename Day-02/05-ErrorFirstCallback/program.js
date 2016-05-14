function divideSync(x,y){
	console.log('      [Service] processing ', x , ' and ', y);
	if (y === 0){
		console.log('      [Service] throwing error');
		throw new Error('Invalid arguments error - Cannot divide by zero');
	}
	var result = x / y;
	console.log('      [Service] returning result');
	return result;
}



function divideSyncClient(x,y){
	console.log('[Client] triggering divideSync');
	try {
		var result = divideSync(x,y);
		console.log('[Client] result = ', result);
	} catch (e){
		console.log('[Client] something went wrong');
	}
}

function divide(x,y,onResult){
	console.log('      [Service] processing ', x , ' and ', y);
	setTimeout(function(){
		if (y === 0){
			console.log('      [Service] throwing error');
			var error = new Error('Invalid arguments error - Cannot divide by zero');
			return onResult(error, null);
		}
		var result = x / y;
		console.log('      [Service] returning result');
		if (typeof onResult === 'function')
			onResult(null, result);
	},2000);
}

function divideClient(x,y){
	console.log('[Client] triggering divide');
	divide(x,y, function(err, result){
		if (err){
			console.log('[Client] something went wrong');
			return;
		}
		console.log('[Client] result = ', result);
	});
}

module.exports.divideSyncClient = divideSyncClient;
module.exports.divideClient = divideClient;
