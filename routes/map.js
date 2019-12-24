const express = require('express');
const router = express();
const mysql = require('mysql');
const dbConfig = require('../config/database');

const dbConnection = mysql.createConnection(dbConfig.connection);

dbConnection.query('USE smartlondon');
dbConnection.on('error', function(err) {
  console.log('[mysql error]', err);
});

router.post('/londonmap', function(req, res) {
  dbConnection.query('SELECT * FROM `geoshape` ', function(err, rows) {
    res.json(rows);
  });
});

module.exports = router;
