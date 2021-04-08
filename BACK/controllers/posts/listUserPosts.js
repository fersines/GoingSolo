const getDB = require("../../db");

const listPosts = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //Sacamos querystring
    const { order, direction } = req.query;
    const { id } = req.params;

    //Compruebo que el id que hace la petición es para si mismo o bien es el admin
    if (req.userAuth.id !== Number(id) && req.userAuth.role !== "admin") {
      const error = new Error("Sólo puedes listar tus Posts, no los de otros");
      error.httpStatus = 403;
      throw error;
    }

    const validOrderFields = ["loves", "date"];
    const validOrderDirection = ["DESC", "ASC"];

    const orderBy = validOrderFields.includes(order) ? order : "loves";
    const orderDirection = validOrderDirection.includes(direction)
      ? direction
      : "DESC";

    let results;

    [results] = await connection.query(
      `
      SELECT posts.id, posts.link, posts.story, posts.title, posts.post_user_id, COUNT(link_likes.love) AS loves
      FROM posts LEFT JOIN link_likes ON (posts.id = link_likes.post_id)
      WHERE posts.post_user_id LIKE ?
      GROUP BY posts.id, posts.title, posts.story, posts.post_user_id
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

module.exports = listPosts;
