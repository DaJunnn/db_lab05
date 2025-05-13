const { Student, Department, Course, Enrollment } = require('./models');

async function testQueries() {
  try {
    // 查詢所有學生
    const students = await Student.findAll();
    console.log('學生列表:');
    students.forEach(student => console.log(`${student.Student_ID} - ${student.Name}`));

    // 查詢所有課程
    const courses = await Course.findAll();
    console.log('\n課程列表:');
    courses.forEach(course => console.log(`${course.Course_ID} - ${course.Title}`));

    // 查詢部門和所屬學生
    const departments = await Department.findAll({
      include: [Student]
    });
    console.log('\n部門及學生列表:');
    departments.forEach(dept => {
      console.log(`部門: ${dept.Name}`);
      dept.Students.forEach(student => {
        console.log(`  - 學生: ${student.Name}`);
      });
    });

    // 查詢學生及修課紀錄（解決關聯錯誤）
    const enrollments = await Enrollment.findAll({
      include: [
        { model: Student, attributes: ['Student_ID', 'Name'] },
        { model: Course, attributes: ['Course_ID', 'Title'] }
      ]
    });
    console.log('\n修課紀錄:');
    enrollments.forEach(enrollment => {
      console.log(`學生: ${enrollment.Student.Name}, 課程: ${enrollment.Course.Title}, 狀態: ${enrollment.Status}`);
    });

  } catch (err) {
    console.error('查詢失敗：', err.message);
  }
}

testQueries();
