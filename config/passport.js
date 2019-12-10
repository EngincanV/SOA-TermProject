const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql');
const dbConfig = require('./database');

const dbConnection = mysql.createConnection(dbConfig.connection);

dbConnection.query('USE smartlondon');
dbConnection.on('error', function(err) {
  console.log('[mysql error]', err);
});

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.Id);
  });

  passport.deserializeUser(function(id, done) {
    dbConnection.query(
      "SELECT * FROM `users` WHERE Id = '" + id + "'",
      function(err, rows) {
        done(err, rows[0]);
      },
    );
  });

  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
      },
      function(req, username, password, done) {
        dbConnection.query(
          "SELECT * FROM `users` where username = '" + username + "'",
          function(err, rows) {
            if (err) return done(err);
            if (rows.length) {
              return done(
                null,
                false,
                req.flash('signupMessage', 'That username is already taken.'),
              );
            } else {
              const newUserMysql = {
                username: username,
                password: password,
              };

              var insertQuery =
                "INSERT INTO users ( `username`, `password` ) VALUES ('" +
                username +
                "','" +
                password +
                "')";

              dbConnection.query(insertQuery, function(err, rows) {
                newUserMysql.id = rows.insertId;

                return done(null, newUserMysql);
              });
            }
          },
        );
      },
    ),
  );

  passport.use(
    'local-login',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
      },
      function(req, username, password, done) {
        dbConnection.query(
          "SELECT * FROM `users` WHERE Username = '" + username + "'",
          function(err, rows) {
            if (err) return done(err);

            if (!rows.length) {
              return done(
                null,
                false,
                req.flash('loginMessage', 'No user found.'),
              );
            }

            if (!(rows[0].Password === password))
              return done(
                null,
                false,
                req.flash('loginMessage', 'Oops! Wrong password.'),
              );

            return done(null, rows[0]);
          },
        );
      },
    ),
  );
};
