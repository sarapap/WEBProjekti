import promisePool from '../../utils/database.js';

const listAllpalaute = async () => {
    const [rows] = await promisePool.query('SELECT * FROM palaute');
    return rows;
};

const findPalauteByPvm= async (pvm) => {
    const [rows] = await promisePool.execute(
        'SELECT * FROM palaute WHERE pvm = ?',
        [pvm]
    );
    if (rows.length === 0) {
        return false;
    }
    return rows[0];
};

const addpalaute = async (user) => {
  const {
    nimi,
    email,
    title,
    teksti,
    pvm
  } = palaute;

  const sql = `INSERT INTO palaute (nimi, email, title, teksti, pvm)
      VALUES (?, ?, ?, ?, ?)`;

  const data = [
    nimi,
    email,
    title,
    teksti,
    pvm
  ];

  const rows = promisePool.execute(sql, data);
  if (rows[0].affectedRows === 0) {
      return false;
  }
  return { asiakas_id: rows[0].insertId };
};


const removePalauteById = async (id) => {
  const connection = await promisePool.getConnection();
  try {
      const [rows] = await promisePool.execute(
          'DELETE FROM palaute WHERE palaute_id = ?',
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

export {
    listAllpalaute,
    findPalauteByPvm,
    addpalaute,
    removePalauteById
};
