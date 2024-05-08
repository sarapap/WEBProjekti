import promisePool from '../../utils/database.js';

const listAllTuote = async () => {
  const [rows] = await promisePool.query('SELECT * FROM tuote');
  return rows;
};

const findTuoteById = async (tuote_id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM tuote WHERE tuote_id = ?',
    [tuote_id]
  );
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const findTuoteByTyyppeId = async (tyyppi_id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM tuote WHERE tyyppi_id = ?',
    [tyyppi_id]
  );
  if (rows.length === 0) {
    return false;
  }
  return rows;
};

const findTuoteByname = async (tuote_nimi) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM tuote WHERE tuote_nimi = ?',
    [tuote_nimi]
  );
  if (rows.length === 0) {
    return false;
  }
  return rows;
};

const findTuoteMaaraByUserId = async (userId) => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM ostoskori WHERE user_id = ?', [userId]);
    if (rows.length === 0) {
      return 0;
    } else {
      return rows.length;
    }
  } catch (error) {
    console.error('Error fetching tuote:', error);
    throw error;
  }
};

const findLastTuoteId = async () => {
  try {
    const [rows] = await promisePool.execute('SELECT tuote_id FROM tuote ORDER BY tuote_id DESC LIMIT 1');
    if (rows.length > 0) {
      const lastTuoteId = rows[0].tuote_id;
      console.log('Last tuote_id:', lastTuoteId);
      return lastTuoteId;
    } else {
      console.error('No tuote found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching last tuote_id:', error);
    throw error;
  }
};

const addTuote = async (tuote, file) => {
  const { tuote_nimi, tuote_kuvaus, tuote_hinta, tuote_kustannus, tyyppi_id } = tuote;

  const sql = `INSERT INTO tuote (tuote_nimi, tuote_kuvaus, tuote_hinta, tuote_kustannus, tyyppi_id, tuote_kuva) 
               VALUES (?, ?, ?, ?, ?, ?)`;

  const params = [tuote_nimi, tuote_kuvaus, tuote_hinta, tuote_kustannus, tyyppi_id, file?.filename || null];

  console.log("SQL-parametrit:", params);

  try {
    const [rows] = await promisePool.execute(sql, params);
    if (rows.affectedRows === 0) {
      console.error("SQL-kysely ei tuottanut tulosta");
      return false;
    }
    return { tuote_id: rows.insertId };
  } catch (error) {
    console.error("Virhe SQL-kyselyssä:", error);
    return false;
  }
};

const removeTuoteById = async (tuote_id) => {
  const connection = await promisePool.getConnection();
  try {
    const [rows] = await promisePool.execute(
      'DELETE FROM tuote WHERE tuote_id = ?',
      [tuote_id]
    );
    if (rows.affectedRows === 0) {
      return false;
    }
    await connection.commit();
    return {
      message: 'tuote deleted',
    };
  } catch (error) {
    await connection.rollback();
    console.error('error', error.message);
    return false;
  } finally {
    connection.release();
  }
};

const updateTuote = async (tuote, file, tuote_id) => {
  const sql = promisePool.format(`UPDATE tuote SET ? WHERE tuote_id = ?`, [
    tuote,
    file,
    tuote_id,
  ]);
  try {
    const rows = await promisePool.execute(sql);
    console.log('updatetuote', rows);
    if (rows.affectedRows === 0) {
      return false;
    }
    return { message: 'success' };
  } catch (e) {
    console.error('error', e.message);
    return false;
  }
};

const findTuoteByKuva = async (tuote_kuva, kieli) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM tuote WHERE tuote_kuva = ? AND tuote_kieli = ?',
      [tuote_kuva, kieli]
    );

    if (rows.length === 0) {
      return null;
    }

    return rows;
  } catch (error) {
    console.error('Virhe tuotteen haussa tuotekuvan perusteella:', error);
    throw error;
  }
};

export {
  listAllTuote,
  findTuoteById,
  findTuoteMaaraByUserId,
  findTuoteByTyyppeId,
  findTuoteByname,
  findLastTuoteId,
  addTuote,
  removeTuoteById,
  updateTuote,
  findTuoteByKuva,
};
