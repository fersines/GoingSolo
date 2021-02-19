const getDB = require("../../db");

const deleteComment = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { id } = req.params;

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
