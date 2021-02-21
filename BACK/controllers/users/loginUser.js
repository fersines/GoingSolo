const getDB = require("../../db");

const loginUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    res.send({
      message: "Login de Usuario",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = loginUser;
