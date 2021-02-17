const getDB = require("../../db");
const { formateDateToDB } = require("../../helpers");

const editPost = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    const { id } = req.params;

    //Compruebo si existe ese Post
    const [current] = await connection.query(
      `SELECT id FROM posts WHERE id=?`,
      [id]
    );

    if (current.length === 0) {
      const error = new Error("No hay ningún Post con ese id en la BBDD");
      error.httpStatus = 404;
      throw error;
    }

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
