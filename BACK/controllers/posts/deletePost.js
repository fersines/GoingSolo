const getDB = require("../../db");

const deletePost = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { id } = req.params;

    //Compruebo si existe ese Post
    const [current] = await connection.query(
      `SELECT id FROM posts WHERE id=?`,
      [id]
    );

    if (current.length === 0) {
      const error = new Error("No hay ningún Post con ese id en la BBDD");
      error.httpStatus = 404;
      throw error;
    }

    //Borrar el Post de la tabla Posts

    res.send({
      message: "Borrar Post",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deletePost;
