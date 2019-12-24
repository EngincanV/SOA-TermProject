const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const dbConfig = require('../config/database');

const dbConnection = mysql.createConnection(dbConfig.connection);

dbConnection.query('USE smartlondon');
dbConnection.on('error', function(err) {
  console.log('[mysql error]', err);
});

router.post('/comment/:district', function(req, res) {
  const comments = `call AddAComment(?,?,?)`;

  const userId = req.user.Id;
  const content = req.body.content;
  const district = req.params.district;
  let districtId;
  dbConnection.query(
    "SELECT id FROM `geoshape` WHERE lad = '" + district + "'",
    function(err, rows) {
      if (err) console.log(err);
      districtId = rows[0].id;
      dbConnection.query(comments, [userId, content, districtId], function(
        err,
        rows,
      ) {
        if (err) console.log(err);

        console.log(rows);
      });
    },
  );
});

module.exports = router;
