const getDB = require("../../db");
const { formateDateToDB } = require("../../helpers");

const editComment = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    const { id } = req.params;

    //Compruebo si existe ese Comentario
    const [
      current,
    ] = await connection.query(`SELECT id FROM link_comments WHERE id=?`, [id]);

    if (current.length === 0) {
      const error = new Error("No hay ningún Comentario con ese id en la BBDD");
      error.httpStatus = 404;
      throw error;
    }

    //Compruebo que vienen los datos mínimos
    const { comment_date, comment, comment_user_id, post_id } = req.body;

    if (!comment || !comment_user_id || !post_id) {
      const error = new Error("Faltan campos!");
      error.httpStatus = 400;
      throw error;
    }

    const dbDate = new Date();

    //Hacemos el UPDATE
    await connection.query(
      `
        UPDATE link_comments SET comment_date=?, comment=?, comment_user_id=?, post_id=?;`,
      [formateDateToDB(dbDate), comment, comment_user_id, post_id]
    );
    res.send({
      status: "Ok",
      data: {
        id,
        comment_date,
        comment,
        comment_user_id,
        post_id,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editComment;
