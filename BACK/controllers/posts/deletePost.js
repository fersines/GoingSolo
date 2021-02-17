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

    //Si no existe devolver un 404
    if (current.length === 0) {
      const error = new Error("No hay ningún Post con ese id en la BBDD");
      error.httpStatus = 404;
      throw error;
    }

    //Borrar los posibles comentarios comentarios asociados a ese Post
    await connection.query(
      `SELECT comment FROM link_comments WHERE post_id=?`,
      [id]
    );

    await connection.query(`DELETE FROM link_comments WHERE post_id=?`, [id]);

    //Borrar los posibles likes asociados a ese Post
    await connection.query(`SELECT love FROM link_likes WHERE post_id=?`, [id]);

    await connection.query(`DELETE FROM link_likes WHERE post_id=?`, [id]);

    //Borrar el Post de la tabla Posts
    await connection.query(`DELETE FROM posts WHERE id=?`, [id]);

    res.send({
      message: `Se ha borrado el post con id: ${id}`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deletePost;
