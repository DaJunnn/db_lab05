const { sequelize, DataTypes } = require('../orm');

const Enrollment = sequelize.define('Enrollment', {
    Student_ID: {
        type: DataTypes.STRING(9),
        primaryKey: true,
    },
    Course_ID: {
        type: DataTypes.STRING(8),
        primaryKey: true,
    },
    Semester_ID: {
        type: DataTypes.STRING(6),
        primaryKey: true,
    },
    Enrollment_Date: {
        type: DataTypes.DATE,
    },
    Grade: {
        type: DataTypes.DECIMAL(5,2),
    },
    Status: {
        type: DataTypes.STRING(10),
    }
}, {
    tableName: 'ENROLLMENT',
    timestamps: false,
});

module.exports = Enrollment;
