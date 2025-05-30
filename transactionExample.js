const pool = require('./db');

async function doTransaction() {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction(); // 開始交易
    
    // 假設要同時將學生 'S10810005' 的系所由 CS001 換成 EE001
    const updateStudent = 'UPDATE STUDENT SET Department_ID = ? WHERE Student_ID = ?';
    await conn.query(updateStudent, ['EE001', 'S10721001']);
    
    // 如果以上操作都成功，則提交交易
    await conn.commit();
    console.log('交易成功，已提交');

    const checkSql = 'SELECT Student_ID, Name, Department_ID FROM STUDENT WHERE Student_ID = ?';
    const rows = await conn.query(checkSql, ['S10721001']);

    if (rows.length > 0) {
        console.log('修改後學生的資料: ');
        console.table(rows);
    }else{
        console.log('查無學生');
    }
        

  } catch (err) {
    // 若有任何錯誤，回滾所有操作
    if (conn) await conn.rollback();
    console.error('交易失敗，已回滾：', err);
  } finally {
    if (conn) conn.release();
  }
}

doTransaction();