const express = require('express');
const router = express.Router();
const passport = require('passport');
const bodyParser = require('body-parser');
require('../config/passport')(passport);

var urlencodedParser = bodyParser.urlencoded({ extended: false });
/* GET users listing. */
router.get('/login', function(req, res) {
  const msg = req.flash('loginMessage');
  res.render('login', { msg: msg });
});

router.get('/signup', function(req, res) {
  const msg = req.flash('signupMessage');
  res.render('signup', { msg: msg });
});

router.post(
  '/login',
  urlencodedParser,
  passport.authenticate('local-login', {
    successRedirect: '/match',
    failureRedirect: '/login',
  }),
);

// router.post('/login', (req, res, next) => {
//   passport.authenticate('local-login', {
//     successRedirect: '/match',
//     failureRedirect: '/users/login',
//     failureFlash: true,
//   })(req, res, next);
// });

router.post(
  '/signup',
  urlencodedParser,
  passport.authenticate('local-signup', {
    successRedirect: '/login',
    failureRedirect: '/signup',
  }),
);

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
});

module.exports = router;
