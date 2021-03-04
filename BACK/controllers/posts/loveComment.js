const getDB = require("../../db");

const loveComment = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //Recojo los parámetros
    const { id } = req.params;
    const { love } = req.body;

    const [narcisoLove] = await connection.query(
      `
      SELECT comment_user_id
      FROM link_comments
      WHERE id=?
    `,
      [id]
    );

    console.log(req.userAuth.id);
    console.log(id);
    console.log(narcisoLove[0].comment_user_id);

    if (narcisoLove[0].comment_user_id === req.userAuth.id) {
      const error = new Error("No puedes dar like a tu propio Comentario.");
      error.httpStatus = 403;
      throw error;
    }

    const [existingLove] = await connection.query(
      `
      SELECT id
      FROM comment_likes
      WHERE love_comment_user_id=? AND comment_id=?
    `,
      [req.userAuth.id, id]
    );

    if (existingLove.length > 0) {
      const error = new Error("Ya has dado like a este Comentario");
      error.httpStatus = 403;
      throw error;
    }

    //Añado el like
    await connection.query(
      `
        INSERT INTO comment_likes(love_comment_date, love_comment, love_comment_user_id, comment_id)
        VALUES(?,?,?,?)
    `,
      [new Date(), love, req.userAuth.id, id]
    );

    //Vemos los votos de ese Comentario
    const [result] = await connection.query(
      `
      SELECT COUNT(comment_likes.love_comment) AS loves
      FROM link_comments LEFT JOIN comment_likes ON (link_comments.id = comment_likes.comment_id)
      WHERE link_comments.id = ?
      `,
      [id]
    );

    res.send({
      status: "Ok",
      message: `Te ha gustado el comentario con id: ${id}`,
      data: `Y ese comentario tiene ${result[0].loves} loves`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = loveComment;
