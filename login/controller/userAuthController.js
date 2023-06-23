const database = require('../databaseConnection');
const bcrypt = require('bcryptjs');
const { body } = require('express-validator');

exports.login = (req, res, next) => {
  const { username, password } = req.body;
  //   console.log(username, password);
  body('email').notEmpty().trim().isEmail();
  body('password').notEmpty();

  return res.render('index', { message: 'invalid username and password' });

  const query = `SELECT * FROM users WHERE username = '${username}'`;

  database.query(query, async function (err, result) {
    // Database connection error
    if (err) {
      console.log(err);
      return res.render('index', { message: 'error in database connection' });
    }

    // User not exist or password is wrong
    if (!result[0] || !(await bcrypt.compare(password, result[0].password))) {
      console.log(password, '\n', result[0].password);
      console.log(result[0]);
      return res.render('index', { message: 'Wrong username or password' });
    }
    // user exist and password is correct
    else {
      const message = result[0].message;
      res.render('profile', { message });
    }
  });
};

// const signup = async (username, password, role, message) => {
//   const hashPassword = await bcrypt.hash(password, 12);
//   const query = `INSERT INTO users VALUES ('${username}', '${hashPassword} ', '${role}', '${message}')`;
//   database.query(query, function (error) {
//     if (error) throw error;
//   });
// };
