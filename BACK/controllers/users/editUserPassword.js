const getDB = require("../../db");

const editUserPassword = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //Recojo de req.params el id de usuario
    const { id } = req.params;

    //Recojo de req.body la pass antigua y la nueva
    const { oldPassword, newPassword } = req.body;

    //Comprobamos tamaño de la nueva contraseña
    if (!newPassword || newPassword.length < 8) {
      const error = new Error("Faltan campos o la contraseña es muy corta");
      error.httpStatus = 400;
      throw error;
    }

    //Comprobar que el usuario del token es el mismo que intenta el cambio
    if (req.userAuth.id !== Number(id)) {
      const error = new Error(
        "No tienes permisos para modificar la password de este usuario"
      );
      error.httpStatus = 403;
      throw error;
    }

    //Comprobar que la contraseña anterior es válida
    const [actual] = await connection.query(
      `
        SELECT id
        FROM users
        WHERE id=? AND password=SHA2(?, 512)
    `,
      [id, oldPassword]
    );

    if (actual.length === 0) {
      const error = new Error(" La contraseña antigua no es correcta");
      error.httpStatus = 401;
      throw error;
    }

    //Guardo la contraseña nueva
    await connection.query(
      `
        UPDATE users
        SET password=SHA2(?, 512), lastAuthUpdate=?
        WHERE id=?
    `,
      [newPassword, new Date(), id]
    );

    res.send({
      status: "Ok",
      message: "Contraseña modificada",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editUserPassword;
