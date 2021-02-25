const getDB = require("../../db");

const deleteUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //Cogemos el usuario a desactivar
    const { id } = req.params;

    //Si el id=1 damos un error

    if (Number(id) === 1) {
      const error = new Error("No es posible desactivar al admin");
      error.httpStatus = 403;
      throw error;
    }

    //Error si el usuario no es admin o no es el propio usuario

    if (req.userAuth.id !== Number(id) && req.userAuth.role !== "admin") {
      const error = new Error(
        "No tienes permisos para desactivar este usuario"
      );
      error.httpStatus = 401;
      throw error;
    }

    //Cambiamos la tabla de usuarios
    //Cambiar mail, pass, nombre, avatar, marcar como no activo
    await connection.query(
      `
        UPDATE users
        SET email="[borrado]", password="[borrado]", name="[borrado]", avatar=NULL, active=0, deleted=1, lastAuthUpdate=?
        WHERE id=?
    `,
      [new Date(), id]
    );

    res.send({
      status: "Ok",
      message: `El usuario con id: ${id} ha sido desactivado`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteUser;
