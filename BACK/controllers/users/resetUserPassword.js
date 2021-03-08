const getDB = require("../../db");
const { passSchema } = require("../../schemas");
const { validate } = require("../../helpers");

const resetUserPassword = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //Saco de req.body los campos recoverCode y newPassword
    const { recoverCode, newPassword } = req.body;

    //Valido que hay nueva contraseña y su longitud
    await validate(passSchema, req.body);

    //Si falta algún campo damos error
    if (!recoverCode) {
      const error = new Error("Falta el recoverCode para el cambio");
      error.httpStatus = 400;
      throw error;
    }

    //Comprobar que hay un user con ese recoverCode
    const [user] = await connection.query(
      `
        SELECT id
        FROM users
        WHERE recoverCode=?
    `,
      [recoverCode]
    );

    //Si no lo hay devolver error
    if (user.length === 0) {
      const error = new Error("Código de recuperación incorrecto");
      error.httpStatus = 404;
      throw error;
    }

    //Establecer la contraseña proporcionada a ese usuario
    await connection.query(
      `
        UPDATE users
        SET password=SHA2(?, 512), lastAuthUpdate=?, recoverCode=NULL
        WHERE id=?
    `,
      [newPassword, new Date(), user[0].id]
    );

    //Devolver response

    res.send({
      status: "Ok",
      message: "La contraseña ha sido reseteada",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = resetUserPassword;
