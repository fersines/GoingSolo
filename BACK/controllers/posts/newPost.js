const getDB = require("../../db");
const { formateDateToDB } = require("../../helpers");

const newPost = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { link, title, story } = req.body;

    if (!link || !title || !story) {
      const error = new Error("Faltan campos");
      error.httpStatus = 400;
      throw error;
    }

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
