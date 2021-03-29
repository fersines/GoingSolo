const getDB = require("../../db");

const getComment = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { id } = req.params;

    const [result] = await connection.query(
      `
        SELECT link_comments.id, link_comments.comment_date, link_comments.comment, link_comments.comment_user_id, link_comments.post_id
        FROM link_comments
        WHERE link_comments.id LIKE ?
        `,
      [id]
    );

    const [single] = result;

    //Devolvemos un json con el detalle del comentario
    res.send({
      status: "Ok",
      data: single,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getComment;
