const dotenv = require('dotenv');
const mysql = require('mysql');

dotenv.config({ path: `${__dirname}/.env` });
const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

connection.connect(function (err) {
  if (!err) {
    console.log('Database is connected ... ');
  } else {
    console.log(err);
  }
});

module.exports = connection;
