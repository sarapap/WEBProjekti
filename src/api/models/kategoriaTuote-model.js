import e from 'express';
import promisePool from '../../utils/database.js';

const listAllKategoriaTuote = async () => {
    const [rows] = await promisePool.query('SELECT * FROM kategoria_tuote');
    return rows;
};

const findKategoriaTuoteById = async (kategoriatuote_id) => {
  const [rows] = await promisePool.execute(
      'SELECT * FROM `kategoria_tuote` WHERE kategoriatuote_id = ?',
      [kategoriatuote_id]
  );
  if (rows.length === 0) {
      return false;
  }
  return rows[0];
};

const findKategoriaTuoteByTuoteId = async (id) => {
  const [rows] = await promisePool.execute(
      'SELECT * FROM kategoria_tuote WHERE tuote_id = ?',
      [id]
  );
  if (rows.length === 0) {
      return false;
  }
  return rows;
};

const findKategoriaTuoteByKategoriaId = async (id) => {
  const [rows] = await promisePool.execute(
      'SELECT * FROM kategoria_tuote WHERE kategoria_id = ?',
      [id]
  );
  if (rows.length === 0) {
      return false;
  }
  return rows[0];
};

const addKategoriaTuote = async (kategoriaTuote) => {
  const {tuote_id, kategoria_id} = kategoriaTuote;
  const sql = `INSERT INTO kategoria_tuote (tuote_id, kategoria_id) VALUES (?, ?)`;
  const data = [tuote_id, kategoria_id];

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

const removeKategoriaTuoteById = async (id) => {
  const connection = await promisePool.getConnection();
  try {
      const [rows] = await promisePool.execute(
          'DELETE FROM kategoria_tuote WHERE kategoriatuote_id = ?', [id]
      );

      if (rows.affectedRows === 0) {
          return false;
      }

      await connection.commit();

      return {
          message: 'kategoriaTuote deleted',
      };
  } catch (error) {
      await connection.rollback();
      console.error('error', error.message);
      return false;
  } finally {
      connection.release();
  }
};

const updateKategoriaTuoteById = async (kategoriaTuote, id) => {
  const sql = promisePool.format(`UPDATE kategoria_tuote SET ? WHERE kategoriatuote_id = ?`, [
      kategoriaTuote,
      id,
  ]);
  try {
      const rows = await promisePool.execute(sql);
      console.log('updatekategoria', rows);
      if (rows.affectedRows === 0) {
          return false;
      }
      return { message: 'success' };
  } catch (e) {
      console.error('error', e.message);
      return false;
  }
};

export {listAllKategoriaTuote,
  findKategoriaTuoteById,
  findKategoriaTuoteByTuoteId,
  findKategoriaTuoteByKategoriaId,
  addKategoriaTuote,
  removeKategoriaTuoteById,
  updateKategoriaTuoteById};
