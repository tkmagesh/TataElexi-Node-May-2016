function f1Sync(){
	console.log('f1Sync triggered');
	console.log('f1Sync completed');
}

function f2Sync(){
	console.log('f2Sync triggered');
	console.log('f2Sync completed');
}

function f3Sync(){
	console.log('f3Sync triggered');
	console.log('f3Sync completed');
}

function f4Sync(){
	console.log('f4Sync triggered');
	console.log('f4Sync completed');
}

/*module.exports.runSync = function(){
	f1Sync();
	f2Sync();
	f3Sync();
	f4Sync();
}*/

var syncFns = [f1Sync, f2Sync, f3Sync, f4Sync];

module.exports.runSync = function(){
	for(var i=0; i<syncFns.length; i++){
		syncFns[i]();
	}
};


function f1(next){
	console.log('f1 triggered');
	setTimeout(function(){
		console.log('f1 completed');
		if (typeof next === 'function')
			next();
	},3000);
}

function f2(next){
	console.log('f2 triggered');
	setTimeout(function(){
		console.log('f2 completed');	
		if (typeof next === 'function')
			next();
	},3000);
}

function f3(next){
	console.log('f3 triggered');
	setTimeout(function(){
		console.log('f3 completed');	
		if (typeof next === 'function')
			next();
	},3000);
}

function f4(next){
	console.log('f4 triggered');
	setTimeout(function(){
		console.log('f4 completed');	
		if (typeof next === 'function')
			next();
	},3000);
}

/*module.exports.run = function(){
	f1(function(){
		f2(function(){
			f3(function(){
				f4();
			});
		});
	});
}*/

var fns = [f1, f2, f3, f4];

module.exports.run = function(){
	//rewrite the below code (sync functions) to work with async functions (f1, f2...);
	function exec(fns){
		var first = fns[0],
			remaining = fns.slice(1),
			next = function(){
				exec(remaining);
			};
		if (typeof first === 'function')
			first(next);
	}
	exec(fns);
}