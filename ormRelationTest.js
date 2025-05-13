const { Student, Course, Department } = require('./models');

async function testRelations() {
  try {
    //  查詢「存在的學生」及其所屬系所
    const student = await Student.findByPk('S10721001', {
      include: [Department]
    });

    if (!student) {
      console.log('查無學生 S10721001');
    } else {
      console.log(`學生 ${student.Name} 屬於 ${student.Department?.Name ?? '無系所資料'} 系`);
    }

    // 查詢該學生選修的所有課程
    const studentWithCourses = await Student.findByPk('S10721001', {
      include: [Course]
    });

    if (!studentWithCourses) {
      console.log('查無學生 S10721001（查課程）');
    } else {
      console.log(`${studentWithCourses.Name} 選修的課程：`);
      studentWithCourses.Courses.forEach(course => {
        console.log(`- ${course.Title} (${course.Credits} 學分)`);
      });
    }

    //  查詢課程及其選修的學生（請確認此課程 ID 是否正確）
    const courseWithStudents = await Course.findByPk('CS101001', {
      include: [Student]
    });

    if (!courseWithStudents) {
      console.log('查無課程 CS101001');
    } else {
      console.log(`選修 ${courseWithStudents.Title} 的學生：`);
      courseWithStudents.Students.forEach(student => {
        console.log(`- ${student.Name} (${student.Student_ID})`);
      });
    }

  } catch (err) {
    console.error('關聯查詢出錯：', err);
  }
}

testRelations();