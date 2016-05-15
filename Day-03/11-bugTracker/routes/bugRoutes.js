var express = require('express'),
	router = express.Router();

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

module.exports = router;