var express = require('express');
var router = express.Router();

router.get('/main', function(req, res) {
  res.render('singlepage');
});

// router.get('/crime', function(req, res) {
//   res.render('crime');
// });

// router.get('/realestate', function(req, res) {
//   res.render('realestate');
// });

// router.get('/schools', function(req, res) {
//   res.render('schools');
// });

// router.get('/citydetails', function(req, res) {
//   res.render('citydetails');
// });

module.exports = router;
