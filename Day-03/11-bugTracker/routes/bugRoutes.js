var express = require('express'),
	router = express.Router();


//Refactor the bug manipulation code into a 'bugService'

var bugsRepo = [
	{id : 1, name : 'Unable to add a new bug', isClosed : false},
	{id : 2, name : 'Object reference not set', isClosed : true},
	{id : 3, name : 'Invalid argument error', isClosed : false},
];
router.get('/', function(req, res, next){
	//res.send('Display the list of bugs here');
	var viewData = {
		list : bugsRepo.slice(0)
	}
	res.render('bugs/index', viewData);
});

router.get('/new', function(req, res, next){
	res.render('bugs/new');
});

router.post('/new', function(req, res, next){
	var newBugId = bugsRepo.reduce(function(result, bug){
		return result > bug.id ? result : bug.id;
	},0) + 1;
	var newBug = {
		id : newBugId,
		name : req.body.bugName,
		isClosed : false
	};
	bugsRepo.push(newBug);
	res.redirect('/bugs');
});

router.get('/toggle/:id', function(req, res, next){
	var bugId = parseInt(req.params.id, 10);
	var bug = bugsRepo.filter(function(b){
		return b.id === bugId;
	})[0];
	if (bug){
		bug.isClosed = !bug.isClosed;
	}
	res.redirect('/bugs');
});

router.get('/closed', function(req, res, next){
	var closedBugs = bugsRepo.filter(function(bug){
		return bug.isClosed
	});
	var ids = closedBugs.map(function(bug){
		return bug.id;
	});
	var viewData = {
		list : closedBugs,
		ids : ids
	};
	res.render('bugs/closed', viewData);

});

router.post('/removeClosed', function(req, res, next){
	var ids = req.body.closedList.split(',');
	bugsRepo = bugsRepo.filter(function(bug){
		return ids.indexOf(bug.id.toString()) === -1;
	});
	res.redirect('/bugs');
});

module.exports = router;