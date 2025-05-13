const { sequelize, DataTypes } = require('../orm');
const Student = require('./Student');
const Course = require('./Course');
const Department = require('./Department');
const Enrollment = require('./Enrollment');

// Student 和 Department 的關聯
Department.hasMany(Student, { foreignKey: 'Department_ID' });
Student.belongsTo(Department, { foreignKey: 'Department_ID' });

// Course 和 Department 的關聯
Department.hasMany(Course, { foreignKey: 'Department_ID' });
Course.belongsTo(Department, { foreignKey: 'Department_ID' });

// Enrollment 和 Student 的關聯 (多對多)
Student.hasMany(Enrollment, { foreignKey: 'Student_ID' });
Enrollment.belongsTo(Student, { foreignKey: 'Student_ID' });

// Enrollment 和 Course 的關聯 (多對多)
Course.hasMany(Enrollment, { foreignKey: 'Course_ID' });
Enrollment.belongsTo(Course, { foreignKey: 'Course_ID' });

// 將所有模型匯出
module.exports = {
  Student,
  Course,
  Department,
  Enrollment,
  sequelize
};
