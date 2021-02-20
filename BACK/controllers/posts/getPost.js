const getDB = require("../../db");

const getPost = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { id } = req.params;

    const [result] = await connection.query(
      `
    SELECT posts.id, posts.link, posts.date, posts.title, posts.post_user_id, posts.story, COUNT(link_likes.love) AS loves
    FROM posts LEFT JOIN link_likes ON (posts.id = link_likes.post_id)
    WHERE posts.id = ?
    `,
      [id]
    );

    const [single] = result;

    //Saco los comentarios de otra manera
    const [comments] = await connection.query(
      `
      SELECT id, comment, comment_date FROM link_comments WHERE post_id=?
    `,
      [id]
    );

    res.send({
      status: "Ok",
      data: {
        ...single,
        comments,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getPost;
