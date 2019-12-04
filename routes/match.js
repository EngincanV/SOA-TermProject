var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/match', function(req, res, next) {
  res.render('match', { title: 'Express' });
});

module.exports = router;
