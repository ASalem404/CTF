const database = require("../databaseConnection");
const bcrypt = require("bcryptjs");
const validator = require("validator");

exports.login = (req, res, next) => {
  const { username, password } = req.body;
  if (
    validator.isEmpty(password.trim()) ||
    validator.isEmpty(username.trim()) ||
    !validator.matches(username, "^[a-zA-Z0-9_.-]*$")
  )
    return res.render("index", { message: "Invalid input" });

  const query = `SELECT * FROM users WHERE username = '${username}'`;

  database.query(query, async function (err, result) {
    // Database connection error
    if (err) {
      console.log(err);
      return res.render("index", { message: "Error in database connection" });
    }

    // User not exist or password is wrong
    if (!result[0] || !(await bcrypt.compare(password, result[0].password))) {
      return res.render("index", { message: "Wrong username or password" });
    }
    // user exist and password is correct
    else {
      const message = result[0].message;
      if (result[0].role === "admin") {
        res.render("profile", { message: `${message}👏😍` });
      } else res.render("profile", { message: `Normal User` });
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
