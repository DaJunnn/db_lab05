const pool = require('./db');

async function transferStudent(studentId, oldDeptId, newDeptId) {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();
    
    // **檢查學生是否存在**
    const [student] = await conn.query('SELECT * FROM STUDENT WHERE Student_ID = ?', [studentId]);
    if (student.length === 0) {
      console.log(`學生 ${studentId} 不存在，將自動新增`);
      // 自動新增學生基本資料
      await conn.query(`
        INSERT INTO STUDENT (Student_ID, Name, Birth_Date, Gender, Email, Phone, Address, Admission_Year, Status, Department_ID) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [studentId, '李青雲', '2003-02-15', 'M', 'lcy@mail.com', '0987654321', '台中市北區', 2021, '在學', oldDeptId]);
      console.log(`已自動新增學生 ${studentId}`);
    }

    // 更新學生所屬系所
    await conn.query(
      'UPDATE STUDENT SET Department_ID = ? WHERE Student_ID = ?',
      [newDeptId, studentId]
    );

    // 標記舊系所必修課程為「退選」
    await conn.query(`
      UPDATE ENROLLMENT 
      SET Status = '退選' 
      WHERE Student_ID = ? 
        AND Course_ID IN (
          SELECT Course_ID FROM COURSE 
          WHERE Department_ID = ?
        )
    `, [studentId, oldDeptId]);

    // 加選新系所必修課程
    const requiredCourses = await conn.query(`
      SELECT Course_ID 
      FROM COURSE 
      WHERE Department_ID = ?
    `, [newDeptId]);

    // 假設有個當前學期的 ID
    const currentSemester = '112-2';
    // 自動生成當前日期
    const enrollmentDate = new Date().toISOString().split('T')[0]; // 格式：YYYY-MM-DD

    for (const course of requiredCourses) {
      await conn.query(`
        INSERT INTO ENROLLMENT (Student_ID, Course_ID, Semester_ID, Enrollment_Date, Status)
        VALUES (?, ?, ?, ?, '修課中')
      `, [studentId, course.Course_ID, currentSemester, enrollmentDate]);
    }

    await conn.commit();
    console.log(`學生 ${studentId} 已從 ${oldDeptId} 轉到 ${newDeptId}`);
  } catch (err) {
    if (conn) await conn.rollback();
    console.error('轉系處理失敗：', err.message);
  } finally {
    if (conn) conn.release();
  }
}

// 執行轉系功能（範例）
transferStudent('S10810005', 'CS001', 'EE001');
