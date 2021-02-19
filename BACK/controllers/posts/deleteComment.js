const getDB = require("../../db");

const deleteComment = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { id } = req.params;

    //Compruebo si existe ese Comentario
    const [
      current,
    ] = await connection.query(`SELECT id FROM link_comments WHERE id=?`, [id]);

    //Si no existe devolver un 404
    if (current.length === 0) {
      const error = new Error("No hay ningún Comentario con ese id en la BBDD");
      error.httpStatus = 404;
      throw error;
    }

    //Borrar el Comentario de la tabla link_comments
    await connection.query(`DELETE FROM link_comments WHERE id=?`, [id]);

    res.send({
      message: `Se ha borrado el Comentario con id: ${id}`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteComment;
