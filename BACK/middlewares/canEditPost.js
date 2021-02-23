const getDB = require("../db");

const canEditPost = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { id } = req.params;

    //Seleccionar el Post para sacar quien la creó
    const [post] = await connection.query(
      `
      SELECT post_user_id
      FROM posts
      WHERE id=?
    `,
      [id]
    );

    //Comprobar que el usuario creador sea el mismo que el del Token
    if (
      post[0].post_user_id !== req.userAuth.id &&
      req.userAuth.role !== "admin"
    ) {
      const error = new Error("No tienes permisos para editar este Post");
      error.httpStatus = 401;
      throw error;
    }

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = canEditPost;
