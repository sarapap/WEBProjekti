import e from 'express';
import promisePool from '../../utils/database.js';

const listAllTilausSisalto = async () => {
    const [rows] = await promisePool.query('SELECT * FROM tilaus_sisalto');
    return rows;
};

const findTilausSisaltoById = async (id) => {
  const [rows] = await promisePool.execute(
      'SELECT * FROM tilaus_sisalto WHERE id = ?',
      [id]
  );
  if (rows.length === 0) {
      return false;
  }
  return rows[0];
};

const findTilausSisaltoByTilausId = async (id) => {
  const [rows] = await promisePool.execute(
      'SELECT * FROM tilaus_sisalto WHERE tilaus_id = ?',
      [id]
  );
  console.log(rows);
  if (rows.length === 0) {
      return false;
  }
  return rows;
};

const findTilausSisaltoByPvm= async (pvm) => {
  const [rows] = await promisePool.execute(
      'SELECT * FROM tilaus_sisalto WHERE tilaus_pvm = ?',
      [pvm]
  );

  if (rows.length === 0) {
      return false;
  }
  console.log(rows);
  return rows;
};

const findTilausSisaltoByDateRange = async (startDate, endDate) => {
const [rows] = await promisePool.execute(
    'SELECT * FROM tilaus_sisalto WHERE tilaus_pvm BETWEEN ? AND ?',
    [startDate, endDate]
);
if (rows.length === 0) {
    return false;
}
return rows;
};

const addTilausSisalto = async (tilaus_sisalto) => {
  const {
    tilaus_id,
    tuote_id,
    maara,
    myynti_summa,
    kustannus_summa,
    tilaus_pvm,
    status
  } = tilaus_sisalto;

  const sql = `INSERT INTO tilaus_sisalto (
    tilaus_id,
    tuote_id,
    maara,
    myynti_summa,
    kustannus_summa,
    tilaus_pvm,
    status
  ) VALUES (?, ?, ?, ?, ?, ?, ?)`;
;

  const data = [
    tilaus_id,
    tuote_id,
    maara,
    myynti_summa,
    kustannus_summa,
    tilaus_pvm,
    status];

  try {
    const [rows] = await promisePool.execute(sql, data);
    if (rows && rows.affectedRows !== 0) {
      rows[0];
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return false;
  }

};

const removeTilausSisaltoById = async (id) => {
  const connection = await promisePool.getConnection();
  try {
      const [rows] = await promisePool.execute(
          'DELETE FROM tilaus_sisalto WHERE id = ?',
          [id]
      );

      if (rows.affectedRows === 0) {
          return false;
      }

      await connection.commit();

      return {
          message: 'TilausSisalto deleted',
      };
  } catch (error) {
      await connection.rollback();
      console.error('error', error.message);
      return false;
  } finally {
      connection.release();
  }
};

const updateTilausSisaltoById = async (tilaus_sisalto, id) => {
  const sql = promisePool.format(`UPDATE tilaus_sisalto SET ? WHERE id = ?`, [
      tilaus_sisalto,
      id,
  ]);
  try {
      const rows = await promisePool.execute(sql);
      console.log('TilausSisalto', rows);
      if (rows.affectedRows === 0) {
          return false;
      }
      return { message: 'success' };
  } catch (e) {
      console.error('error', e.message);
      return false;
  }
};

export {
  listAllTilausSisalto,
  findTilausSisaltoById,
  findTilausSisaltoByTilausId,
  findTilausSisaltoByPvm,
  findTilausSisaltoByDateRange,
  addTilausSisalto,
  removeTilausSisaltoById,
  updateTilausSisaltoById
};
