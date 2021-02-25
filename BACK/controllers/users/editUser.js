const getDB = require("../../db");
const { savePhoto, generateRandomString, sendMail } = require("../../helpers");

const editUser = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    //Sacar id de req.params
    const { id } = req.params;

    //Sacar email y name de req.body
    const { name, email } = req.body;

    //Comprobar que el usuario a editar es admin o el mismo del token
    if (req.userAuth.id !== Number(id) && req.userAuth.role !== "admin") {
      const error = new Error("No tienes permisos para editar este usuario");
      error.httpStatus = 403;
      throw error;
    }

    //Sacar la información actual del usuario en BBDD
    const [currentUser] = await connection.query(
      `  
        SELECT email
        FROM users
        WHERE id=?
    `,
      [id]
    );

    if (req.files && req.files.avatar) {
      //Se está subiendo un avatar
      const userAvatar = await savePhoto(req.files.avatar);

      await connection.query(
        `
        UPDATE users
        SET avatar=?
        WHERE id=?
      `,
        [userAvatar, id]
      );
    }

    //Si el mail nuevo es distinto al de BBDD procesamos el nuevo
    if (email !== currentUser[0].email) {
      //Comprobar que no exista ya ese mail en BBDD
      const [existinEmail] = await connection.query(
        `
            SELECT id
            FROM users
            WHERE email=?
        `,
        [email]
      );

      if (existinEmail.lenght > 0) {
        const error = new Error(
          "Ya existe un usuario en nuestra BBDD con el email que nos facilitas"
        );
        error.httpStatus = 409;
        throw error;
      }

      //Creo un código de registro
      const registrationCode = generateRandomString(40);

      //Mando mail al usuario para confirmar registro
      const emailBody = `
        Estás modificando tu email en Link it UP!
        Pulsa en este link para validar tu nuevo email: ${process.env.PUBLIC_HOST}/users/validate/${registrationCode}
        `;

      await sendMail({
        to: email,
        subject: "Confirma tu nuevo email en Link it UP!",
        body: emailBody,
      });

      //Actualizo los datos finales
      await connection.query(
        `
        UPDATE users
        SET name=?, email=?, lastAuthUpdate=?, active=0, registrationCode=?
        WHERE id=?
      `,
        [name, email, new Date(), registrationCode, id]
      );

      //Dar una respuesta
      res.send({
        status: "Ok",
        message:
          "Datos de usuario actualizados. Mira tu email para validar los cambios",
      });
    } else {
      await connection.query(
        `
            UPDATE users
            SET name=?, email=?
            WHERE id=?
        `,
        [name, email, id]
      );
    }

    //Dar una respuesta

    res.send({
      status: "Ok",
      message: "Datos de usuario actualizados",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editUser;
