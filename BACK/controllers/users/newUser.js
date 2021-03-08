const getDB = require("../../db");
const { generateRandomString, sendMail, validate } = require("../../helpers");
const { registrationSchema } = require("../../schemas");

const newUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //Valido que el email y la pass cumplan requisitos
    await validate(registrationSchema, req.body);

    //Recojo de req.body mail y pass
    const { email, password } = req.body;

    //Compruebo que el mail sea único
    const [existingUser] = await connection.query(
      `
        SELECT id FROM users WHERE email=?
        `,
      [email]
    );

    if (existingUser.length > 0) {
      const error = new Error("Ya hay un usuario con ese email en la BBDD");
      error.httpStatus = 409;
      throw error;
    }

    //Creo un código de registro (contraseña temporar de un solo uso)
    const registrationCode = generateRandomString(40);

    //Mando mail al usuario para confirmar registro
    const emailBody = `
        Te acabas de registrar en Link it UP!
        Pulsa en este link para validar tu email: ${process.env.PUBLIC_HOST}/users/validate/${registrationCode}
    `;

    await sendMail({
      to: email,
      subject: "Activa tu usuario de Link it UP!",
      body: emailBody,
    });

    //Meto el usuario en la BBDD desactivado y con ese código de registro
    await connection.query(
      `
        INSERT INTO users(date, email, password, registrationCode)
        VALUES(?,?,SHA2(?, 512),?)
    `,
      [new Date(), email, password, registrationCode]
    );

    //Mando una respuesta
    res.send({
      status: "Ok",
      message: "Usuario registrado, comprueba tu email para activarlo",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = newUser;
