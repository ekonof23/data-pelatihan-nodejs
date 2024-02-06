var mysql = require("mysql");
require('dotenv').config();

var conn = mysql.createConnection({
  host: process.env.MYSQL_ADDON_HOST,
  database: process.env.MYSQL_ADDON_DB,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  port: process.env.MYSQL_ADDON_PORT,
});
conn.connect(function (err) {
  if (err) throw err;
  console.log("Database is connected successfully !");
});
module.exports = conn;
