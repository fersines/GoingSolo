const getDB = require("../../db");
const { generateRandomString, sendMail } = require("../../helpers");

const recoverUserPassword = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //Sacar de req.body el mail al que enviar la info para el cambio
    const { email } = req.body;

    //Si no hay mail dar un error
    if (!email) {
      const error = new Error("Faltan campos");
      error.httpStatus = 400;
      throw error;
    }

    //Comprobar que el email existe en BBDD y si no dar un error
    const [currentEmail] = await connection.query(
      `
        SELECT id
        FROM users
        WHERE email=?
    `[email]
    );

    if (currentEmail.length === 0) {
      const error = new Error("No hay ningún usuario con ese email");
      error.httpStatus = 404;
      throw error;
    }

    //Generar código de
    const recoverCode = generateRandomString(20);

    //Enviar por mail el código de recuperación
    const emailBody = `
        Has solicitado moficiar tu password en Link it UP!

        El código de recuperación es: ${recoverCode}

        Si no has solicitado dicho cambio puedes ignorar esta comunicación y acceder sin problemas.

        Saludos!
    `;

    await connection.query(
      `
        UPDATE users
        SET recoverCode=?
        WHERE email=?
    `,
      [recoverCode, email]
    );

    await sendMail({
      to: email,
      subject: "Cambio de contraseña en Link it UP!",
      body: emailBody,
    });

    //Dar una respuesta

    res.send({
      status: "Ok",
      message: "Email enviado",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = recoverUserPassword;
