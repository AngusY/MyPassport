var express = require('express');
var passport = require('passport');
var router = express.Router();

var mystatus = "ready...";

/* GET home page. */
router.get('/', function(req, res, next) {
	mystatus = "not authenticated yet...";
	res.render('index', { title: 'Express', msg: mystatus });
});

function checkPermission(req, res, next) {
  if (req.isAuthenticated()) {
    // has the right access permission, continue to the next
    return next(); }

  // no access permission, go back to the home page
  res.redirect('/')
}

/* GET protected route */
router.get('/protected', checkPermission, function(req, res) {
	mystatus = "protected area...";
	res.render('protected', { title: 'Protected Area', msg: mystatus });
});

/* GET lougout route */
router.get('/logout', function(req, res) {
	mystatus = "logging out...";
	req.logout();
	res.redirect('/');
});

router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/'}),
	function(req, res) {
		mystatus = "callback triggered...";
		res.redirect('/');
	}
);

module.exports = router;
