const getDB = require("../db");

const canEditComment = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { id } = req.params;

    //Seleccionar el Post para sacar quien la creó
    const [post] = await connection.query(
      `
      SELECT comment_user_id
      FROM link_comments
      WHERE id=?
    `,
      [id]
    );

    //Comprobar que el usuario creador sea el mismo que el del Token
    if (
      post[0].comment_user_id !== req.userAuth.id &&
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

module.exports = canEditComment;
