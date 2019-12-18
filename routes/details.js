var express = require('express');
var router = express.Router();

const mysql = require('mysql');
const dbConfig = require('../config/database');

const dbConnection = mysql.createConnection(dbConfig.connection);

dbConnection.query('USE smartlondon');
dbConnection.on('error', function(err) {
  console.log('[mysql error]', err);
});
// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.send('Unauthorized !.Please try login');
// }

router.get('/main/:district', function(req, res) {
  let districtData = {
    realEstate: {
      rent: null,
      schoolCount: null,
    },
    school: null,
    crime: null,
    others: {
      green: null,
      travel: null,
    },
    tax: null,
  };

  const realestate = `call GetRentPerMonth(?)`;

  dbConnection.query(realestate, req.params.district, function(err, rows) {
    if (err) {
      console.log(err);
    } else {
      if (rows[0]) {
        districtData.realEstate.rent = Math.floor(rows[0][0].Rent);
        districtData.realEstate.schoolCount = rows[0][0].SchoolCount;
        districtData.tax = rows[0][0].Tax;
      }
    }
  });

  // dbConnection.end();
  const crime = `call GetSafety(?)`;
  dbConnection.query(crime, req.params.district, function(err, rows) {
    if (err) {
      console.log(err);
    } else {
      if (rows[0]) {
        districtData.school = Math.floor(rows[0][0].Schools * 100);
        districtData.crime = Math.floor(rows[0][0].Safety * 100);
        districtData.others.green = Math.floor(rows[0][0].Green * 100);
        districtData.others.travel = Math.floor(rows[0][0].Travel * 100);
        res.render('partials/appbar', { district: districtData });
      }
    }
  });
});

module.exports = router;
