const jwt = require("jsonwebtoken");
const getDB = require("../../db");

const loginUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //Recoger mail y pass de req.body
    const { email, password } = req.body;

    //Dar error si no hay mail o pass
    if (!email || !password) {
      const error = new Error("Faltan campos!");
      error.httpStatus = 400;
      throw error;
    }

    //Cogemos de la BBDD el usuario con ese mail y pass
    const [user] = await connection.query(
      `
        SELECT id, role, active
        FROM users
        WHERE email=? AND password=SHA2(?, 512)
    `,
      [email, password]
    );

    //Si no existe es porque mail o pass no son correctos
    if (user.length === 0) {
      const error = new Error("El email o la password son incorrectos");
      error.httpStatus = 401;
      throw error;
    }

    //Si no está activo avisamos que está pendiente de validar
    if (!user[0].active) {
      const error = new Error(
        "El usuario está pendiente de validar. Comprueba tu email"
      );
      error.httpStatus = 401;
      throw error;
    }

    //Asumimos que el login fue correcto

    //Creo el objeto de información que irá en el token
    const info = {
      id: user[0].id,
      role: user[0].role,
    };

    const token = jwt.sign(info, process.env.SECRET, {
      expiresIn: "30d",
    });

    res.send({
      status: "Ok",
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = loginUser;
