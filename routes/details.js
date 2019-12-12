var express = require('express');
var router = express.Router();

router.get('/details', function(req, res) {
  res.render('details');
});

router.get('/crime', function(req, res) {
  res.render('crime');
});

router.get('/realestate', function(req, res) {
  res.render('realestate');
});

router.get('/schools', function(req, res) {
  res.render('schools');
});

router.get('/citydetails', function(req, res) {
  res.render('citydetails');
});

module.exports = router;
