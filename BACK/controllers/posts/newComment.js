const getDB = require("../../db");
const { formateDateToDB } = require("../../helpers");
const { commentSchema } = require("../../schemas");
const { validate } = require("../../helpers");

const newComment = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //Valido que comment cumpla requisitos
    await validate(commentSchema, req.body);

    //Recojo datos del body y de params
    const { id } = req.params;
    const { comment } = req.body;

    const now = new Date();

    //Añado el comentario a la tabla
    const [result] = await connection.query(
      `
        INSERT INTO link_comments(comment_date, comment, comment_user_id, post_id)
        VALUES (?,?,?,?);
        `,
      [formateDateToDB(now), comment, req.userAuth.id, id]
    );

    const { insertId } = result;

    res.send({
      status: "Ok",
      data: {
        id: insertId,
        date: now,
        comment,
        user: req.userAuth.id,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = newComment;
