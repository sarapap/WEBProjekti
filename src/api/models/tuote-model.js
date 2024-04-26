import e from 'express';
import promisePool from '../../utils/database.js';

const listAllTuote= async () => {
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

const findTuoteByname = async (tuote_nimi) => {
  const [rows] = await promisePool.execute(
      'SELECT * FROM tuote WHERE tuote_nimi = ?',
      [tuote_nimi]
  );
  if (rows.length === 0) {
      return false;
  }
  return rows[0];
};

const addTuote = async (tuote, file) => {
  const { tuote_nimi, tuote_hinta, tuote_kustannus, tuote_tyyppi } = tuote;

  const sql = `INSERT INTO tuote (tuote_nimi, tuote_kuva, tuote_hinta, tuote_kustannus, tuote_tyyppi)
               VALUES (?, ?, ?, ?, ?)`;

               console.log('file', file);
  const params = [tuote_nimi, file.filename || null, tuote_hinta, tuote_kustannus, tuote_tyyppi];
  console.log('params', params);

  try {
    const [rows] = await promisePool.execute(sql, params);
    if (rows.affectedRows === 0) {
      return false;
    }
    return { tuote_id: rows.insertId };
  } catch (error) {
    console.error("Error executing SQL query:", error);
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

export {listAllTuote, findTuoteById, findTuoteByname, addTuote, removeTuoteById, updateTuote};
