const getDB = require("../../db");

const validateUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { registrationCode } = req.params;

    //Comprobar que existe un usuario pendiente de validar con ese código
    const [user] = await connection.query(
      `
        SELECT id FROM users WHERE registrationCode=?
    `,
      [registrationCode]
    );

    //Si no lo hay, devolvemos error
    if (user.length === 0) {
      const error = new Error(
        "No hay ningún usuario pendiente de validar con ese código"
      );
      error.httpStatus = 404;
      throw error;
    }
    //Activar el usuario y quitar el registrationCode
    await connection.query(
      `
        UPDATE users
        SET active=true, registrationCode=NULL
        WHERE registrationCode=?
    `,
      [registrationCode]
    );

    res.send({
      status: "Ok",
      message: "Usuario validado",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = validateUser;
