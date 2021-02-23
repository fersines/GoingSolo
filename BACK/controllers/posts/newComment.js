const getDB = require("../../db");
const { formateDateToDB } = require("../../helpers");

const newComment = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { comment, post_id } = req.body;

    if (!comment || !post_id) {
      const error = new Error("Faltan campos");
      error.httpStatus = 400;
      throw error;
    }

    const now = new Date();

    const [result] = await connection.query(
      `
        INSERT INTO link_comments (comment_date, comment, comment_user_id, post_id)
        VALUES (?,?,?,?);
        `,
      [formateDateToDB(now), comment, req.userAuth.id, post_id]
    );

    const { insertId } = result;

    res.send({
      status: "Ok",
      data: {
        id: insertId,
        date: now,
        comment,
        user: req.userAuth.id,
        post_id,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = newComment;
