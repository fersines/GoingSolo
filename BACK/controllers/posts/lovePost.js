const getDB = require("../../db");
const { formateDateToDB } = require("../../helpers");

const lovePost = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //Recojo los parámetros
    const { id } = req.params;
    const { love } = req.body;

    const now = new Date();

    //Añado el like
    await connection.query(
      `
        INSERT INTO link_likes(love_date, love, post_id)
        VALUES(?,?,?)
    `,
      [formateDateToDB(now), love, id]
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
