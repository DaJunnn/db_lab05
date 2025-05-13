const { sequelize, DataTypes } = require('../orm');

const Course = sequelize.define('Course', {
    Course_ID: {
        type: DataTypes.STRING(8),
        primaryKey: true,
    },
    Title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    Description: {
        type: DataTypes.TEXT,
    },
    Credits: {
        type: DataTypes.INTEGER,
    },
    Level: {
        type: DataTypes.STRING(10),
    },
    Hours_Per_Week: {
        type: DataTypes.INTEGER,
    },
    Department_ID: {
        type: DataTypes.STRING(5),
    }
}, {
    tableName: 'COURSE',
    timestamps: false,
});

module.exports = Course;
