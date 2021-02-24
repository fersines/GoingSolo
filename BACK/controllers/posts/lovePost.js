const getDB = require("../../db");

const lovePost = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //Recojo los parámetros
    const { id } = req.params;
    const { love } = req.body;

    const [narcisoLove] = await connection.query(
      `
      SELECT love_user_id
      FROM link_likes JOIN posts ON (posts.post_user_id = link_likes.love_user_id)
      WHERE love_user_id=?
    `,
      [req.userAuth.id]
    );

    if (narcisoLove[0].love_user_id === req.userAuth.id) {
      const error = new Error("No puedes dar like a tu propio Post.");
      error.httpStatus = 403;
      throw error;
    }

    const [existingLove] = await connection.query(
      `
      SELECT id
      FROM link_likes
      WHERE love_user_id=? AND post_id=?
    `,
      [req.userAuth.id, id]
    );

    if (existingLove.length > 0) {
      const error = new Error("Ya has dado like a este Post.");
      error.httpStatus = 403;
      throw error;
    }

    //Añado el like
    await connection.query(
      `
        INSERT INTO link_likes(love_date, love, love_user_id, post_id)
        VALUES(?,?,?,?)
    `,
      [new Date(), love, req.userAuth.id, id]
    );

    //Vemos los votos de ese Post
    const [result] = await connection.query(
      `
      SELECT COUNT(link_likes.love) AS loves
      FROM posts LEFT JOIN link_likes ON (posts.id = link_likes.post_id)
      WHERE posts.id = ?
      `,
      [id]
    );

    res.send({
      status: "Ok",
      message: `Te ha gustado el post con id: ${id}`,
      data: `Y ese post tiene ${result[0].loves} loves`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = lovePost;
