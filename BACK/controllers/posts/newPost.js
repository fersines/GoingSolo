const getDB = require("../../db");
const { formateDateToDB } = require("../../helpers");
const { postSchema } = require("../../schemas");
const { validate } = require("../../helpers");

const newPost = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //Recojo del body los datos del nuevo Post
    const { link, title, story } = req.body;

    //Valido que link, title y story cumplan los requisitos
    await validate(postSchema, req.body);

    const now = new Date();

    const [result] = await connection.query(
      `
        INSERT INTO posts (date, link, title, story, post_user_id)
        VALUES (?,?,?,?,?);
        `,
      [formateDateToDB(now), link, title, story, req.userAuth.id]
    );

    const { insertId } = result;

    res.send({
      status: "Ok",
      message: "Tu Link se ha publicado!",
      data: {
        id: insertId,
        date: now,
        link,
        title,
        story,
        post_user_id: req.userAuth.id,
        loves: 0,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = newPost;
