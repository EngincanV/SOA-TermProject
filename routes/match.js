var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/match', function(req, res, next) {
  const msg = req.flash('successMessage');
  res.render('match', { successMsg: msg });
});

module.exports = router;
