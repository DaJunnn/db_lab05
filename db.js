// db.js
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '411631178',
  database: 'university_db',
  connectionLimit: 5
});

module.exports = pool;