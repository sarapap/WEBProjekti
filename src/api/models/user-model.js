import e from 'express';
import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
    const [rows] = await promisePool.query('SELECT * FROM asiakas');
    return rows;
};

const findUserById = async (id) => {
    const [rows] = await promisePool.execute(
        'SELECT * FROM asiakas WHERE asiakas_id = ?',
        [id]
    );
    if (rows.length === 0) {
        return false;
    }
    return rows[0];
};

const addUser = async (user) => {
  const {
    etunimi,
    sukunimi,
    tunnus,
    salasana,
    rooli,
    email,
    puhelin,
    syntymapaiva,
    ehdot_hyvaksytty,
    allennus_ryhma

  } = user;


  const sql = `INSERT INTO asiakas (etunimi, sukunimi, tunnus,
      salasana, rooli, email, puhelin, syntymapaiva, ehdot_hyvaksytty, allennus_ryhma)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const data = [
    etunimi,
    sukunimi,
    tunnus,
    salasana,
    rooli,
    email,
    puhelin,
    syntymapaiva,
    ehdot_hyvaksytty,
    allennus_ryhma
  ];

  const rows =  promisePool.execute(sql, data);
  if (rows[0].affectedRows === 0) {
      return false;
  }
  return { asiakas_id: rows[0].insertId };
};

const getUserByUsername = async (asiakas_etunimi, asiakas_sukunimi) => {
  const sql = `SELECT *
               FROM asiakas
               WHERE asiakas_etunimi = ? AND asiakas_sukunimi = ?`;
  const [rows] = await promisePool.execute(sql, [asiakas_etunimi, asiakas_sukunimi]);
  if (rows.length === 0) {
      return false;
  }
  return rows[0];
};


const removeUser = async (id) => {
  const connection = await promisePool.getConnection();
  try {
      const [rows] = await promisePool.execute(
          'DELETE FROM asiakas WHERE asiakas_id = ?',
          [id]
      );

      if (rows.affectedRows === 0) {
          return false;
      }

      await connection.commit();

      return {
          message: 'User deleted',
      };
  } catch (error) {
      await connection.rollback();
      console.error('error', error.message);
      return false;
  } finally {
      connection.release();
  }
};

const updateUser = async (user, id) => {
  const sql = promisePool.format(`UPDATE asiakas SET ? WHERE asiakas_id = ?`, [
      user,
      id,
  ]);
  try {
      const rows = await promisePool.execute(sql);
      console.log('updateUser', rows);
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
    listAllUsers,
    findUserById,
    addUser,
    getUserByUsername,
    removeUser,
    updateUser,
};
