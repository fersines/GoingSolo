const getDB = require("../../db");

const listPosts = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //Sacamos querystring
    const { search, order, direction } = req.query;

    const validOrderFields = ["loves", "date"];
    const validOrderDirection = ["DESC", "ASC"];

    const orderBy = validOrderFields.includes(order) ? order : "loves";
    const orderDirection = validOrderDirection.includes(direction)
      ? direction
      : "DESC";

    let results;

    if (search) {
      [results] = await connection.query(
        `
      SELECT posts.id, posts.link, posts.date, posts.title, posts.post_user_id, COUNT(link_likes.love) AS loves
      FROM posts LEFT JOIN link_likes ON (posts.id = link_likes.post_id)
      WHERE posts.title LIKE ? OR posts.story LIKE ? OR posts.post_user_id LIKE ?
      GROUP BY posts.id, posts.title, posts.story, posts.post_user_id
      ORDER BY ${orderBy} ${orderDirection};
        `,
        [`%${search}%`, `%${search}%`, `%${search}%`]
      );
    } else {
      //Leemos los posts de la BBDD
      [results] = await connection.query(
        `
      SELECT posts.id, posts.link, posts.date, posts.title, posts.post_user_id, COUNT(link_likes.love) AS loves
      FROM posts LEFT JOIN link_likes ON (posts.id = link_likes.post_id)
      GROUP BY posts.id, posts.title, posts.story, posts.post_user_id
      ORDER BY ${orderBy} ${orderDirection};
        `
      );
    }

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

module.exports = listPosts;
