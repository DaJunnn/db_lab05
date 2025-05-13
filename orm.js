const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('university_db', 'root', '411631178', {
  host: 'localhost',
  dialect: 'mariadb'
});

module.exports = { sequelize, DataTypes };