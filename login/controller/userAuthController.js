const database = require("../databaseConnection");
const bcrypt = require("bcryptjs");
const validator = require("validator");

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (
    validator.isEmpty(password.trim()) ||
    validator.isEmpty(email.trim()) ||
    !validator.isEmail(email.trim())
  )
    return res.render("index", { message: "Invalid input" });

  const query = `SELECT * FROM users WHERE username = '${email}'`;

  database.query(query, async function (err, result) {
    // Database connection error
    if (err) {
      console.log(err);
      return res.render("index", { message: "Error in database connection" });
    }

    // User not exist or password is wrong
    if (!result[0] || !(await bcrypt.compare(password, result[0].password))) {
      return res.render("index", { message: "Wrong email or password" });
    }
    // user exist and password is correct
    else {
      const message = result[0].message;
      res.render("profile", { message: `${message}👏😍` });
    }
  });
};

exports.signup = async (username, password, role, message) => {
  const hashPassword = await bcrypt.hash(password, 12);
  const query = `INSERT INTO users VALUES ('${username}', '${hashPassword}', '${role}', '${message}')`;
  database.query(query, function (error) {
    if (error) throw error;
  });
};
