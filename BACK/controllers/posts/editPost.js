const getDB = require("../../db");
const { differenceInHours } = require("date-fns");
const { postSchema } = require("../../schemas");
const { validate } = require("../../helpers");

const editPost = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    const { id } = req.params;

    //Seleccionar el Post para sacar la fecha
    const [post] = await connection.query(
      `
      SELECT date
      FROM posts
      WHERE id=?
    `,
      [id]
    );

    //Comprobar que el Token no está "caducado"
    const difference = differenceInHours(new Date(), new Date(post[0].date));

    if (
      difference > Number(process.env.MAX_EDIT_POST_MARGIN) &&
      req.userAuth.role !== "admin"
    ) {
      const error = new Error(
        `No es posible editar un Post si han pasado más de ${process.env.MAX_EDIT_POST_MARGIN} horas desde su publicación y han pasado ya ${difference} horas.`
      );
      error.httpStatus = 403;
      throw error;
    }

    //Comprobar que vienen los datos mínimos
    const { date, link, title, story } = req.body;

    //Valido que link, title y story cumplan los requisitos
    await validate(postSchema, req.body);

    //Hacemos el UPDATE
    await connection.query(
      `
        UPDATE posts SET date=?, link=?, title=?, story=? WHERE id=?;`,
      [new Date(), link, title, story, id]
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
