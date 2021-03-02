const getDB = require("../../db");

const listUserComments = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //Sacamos querystring
    const { order, direction } = req.query;
    const { id } = req.params;

    const validOrderFields = ["loves", "date"];
    const validOrderDirection = ["DESC", "ASC"];

    const orderBy = validOrderFields.includes(order) ? order : "loves";
    const orderDirection = validOrderDirection.includes(direction)
      ? direction
      : "DESC";

    let results;

    [results] = await connection.query(
      `
      SELECT link_comments.id, link_comments.comment_date, link_comments.comment, link_comments.comment_user_id, link_comments.post_id, COUNT(comment_likes.love_comment) AS loves
      FROM link_comments LEFT JOIN comment_likes ON (link_comments.id = comment_likes.comment_id)
      WHERE link_comments.comment_user_id LIKE ?
      GROUP BY link_comments.id, link_comments.comment_date, link_comments.comment, link_comments.comment_user_id, link_comments.post_id
      ORDER BY ${orderBy} ${orderDirection};
        `,
      [id]
    );

    //Devolvemos un json con los posts
    res.send({
      status: "Ok",
      data: results,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = listUserComments;
