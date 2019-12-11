var express = require('express');
var router = express.Router();

router.get('/details', function(req,res){
    res.render('details');
});

router.get('/crime', function(req,res){
    res.render('crime');
});

router.get('/demoraphics', function(req,res){
    res.render('demoraphics');
});
router.get('/realestate', function(req,res){
    res.render('realestate');
});




module.exports = router;