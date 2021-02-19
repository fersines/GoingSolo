const getDB = require("../../db");
const { formateDateToDB } = require("../../helpers");

const editPost = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    const { id } = req.params;

    //Comprobar que vienen los datos mínimos
    const { date, link, title, story } = req.body;

    if (!date || !link || !title || !story) {
      const error = new Error("Faltan campos!");
      error.httpStatus = 400;
      throw error;
    }

    const dbDate = new Date(date);

    //Hacemos el UPDATE
    await connection.query(
      `
        UPDATE posts SET date=?, link=?, title=?, story=? WHERE id=?;`,
      [formateDateToDB(dbDate), link, title, story, id]
    );
    res.send({
      status: "Ok",
      data: {
        id,
        date,
        link,
        title,
        story,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editPost;
