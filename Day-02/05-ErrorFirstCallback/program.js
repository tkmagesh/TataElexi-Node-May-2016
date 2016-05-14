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
			throw new Error('Invalid arguments error - Cannot divide by zero');
		}
		var result = x / y;
		console.log('      [Service] returning result');
		if (typeof onResult === 'function')
			onResult(result);
	},2000);
}

function divideClient(x,y){
	console.log('[Client] triggering divide');
	try {
		divide(x,y, function(result){
			console.log('[Client] result = ', result);
		});
	} catch (e){
		console.log('[Client] something went wrong');
	}
}

module.exports.divideSyncClient = divideSyncClient;
module.exports.divideClient = divideClient;
