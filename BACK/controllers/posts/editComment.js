const getDB = require("../../db");
const { differenceInHours } = require("date-fns");

const editComment = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    const { id } = req.params;

    //Seleccionar el Comentario para sacar la fecha
    const [actual] = await connection.query(
      `
      SELECT comment_date
      FROM link_comments
      WHERE id=?
    `,
      [id]
    );

    //Comprobar que el Token no está "caducado"
    const difference = differenceInHours(new Date(), new Date(actual[0].date));

    if (
      difference > Number(process.env.MAX_EDIT_COMMENT_MARGIN) &&
      req.userAuth.role !== "admin"
    ) {
      const error = new Error(
        `No es posible editar un Comentario si han pasado más de ${process.env.MAX_EDIT_COMMENT_MARGIN} horas desde su publicación y han pasado ya ${difference} horas.`
      );
      error.httpStatus = 403;
      throw error;
    }

    //Compruebo que vienen los datos mínimos
    const { comment } = req.body;

    if (!comment) {
      const error = new Error("Faltan campos!");
      error.httpStatus = 400;
      throw error;
    }

    const dbDate = new Date();

    //Hacemos el UPDATE
    await connection.query(
      `
        UPDATE link_comments SET comment_date=?, comment=? WHERE id=?;`,
      [new Date(), comment, id]
    );

    res.send({
      status: "Ok",
      data: {
        id,
        dbDate,
        comment,
        user: req.userAuth.id,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editComment;
