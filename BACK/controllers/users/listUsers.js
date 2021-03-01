const getDB = require("../../db");

const listUsers = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //Sacamos querystring
    const { search, order, direction } = req.query;

    const validOrderFields = ["loves", "date"];
    const validOrderDirection = ["DESC", "ASC"];

    const orderBy = validOrderFields.includes(order) ? order : "email";
    const orderDirection = validOrderDirection.includes(direction)
      ? direction
      : "ASC";

    let results;

    if (search) {
      [results] = await connection.query(
        `
      SELECT users.id, users.date, users.email, users.name, users.active
      FROM users
      WHERE users.email LIKE ? OR users.name LIKE ?
      ORDER BY ${orderBy} ${orderDirection};
        `,
        [`%${search}%`, `%${search}%`]
      );
    } else {
      //Leemos los posts de la BBDD
      [results] = await connection.query(
        `
      SELECT users.id, users.date, users.email, users.name, users.active
      FROM users
      ORDER BY ${orderBy} ${orderDirection};
        `
      );
    }

    //Devolvemos un json con los posts
    res.send({
      status: "Ok",
      data: results,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = listUsers;
