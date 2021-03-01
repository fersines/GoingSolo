const getDB = require("../db");
const jwt = require("jsonwebtoken");

const isUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { authorization } = req.headers;

    //Si no hay auth devuelvo error
    if (!authorization) {
      const error = new Error("No hay cabecera de autorización.");
      error.httpStatus = 401;
      throw error;
    }

    //Valido Token y si no fuese válido devuelvo error
    let tokenInfo;
    try {
      tokenInfo = jwt.verify(authorization, process.env.SECRET);
    } catch (e) {
      const error = new Error("El Token no es válido!");
      error.httpStatus = 401;
      throw error;
    }

    //Comprobar que el Token no se generase antes del cambio de password
    const [result] = await connection.query(
      `
      SELECT lastAuthUpdate
      FROM users
      WHERE id=?
    `,
      [tokenInfo.id]
    );

    const lastAuthUpdate = new Date(result[0].lastAuthUpdate);
    const tokenEmissionDate = new Date(tokenInfo.iat * 1000);

    if (tokenEmissionDate < lastAuthUpdate) {
      const error = new Error("El Token no es válido");
      error.httpStatus = 401;
      throw error;
    }

    //Inyectamos en la request la información del Token
    req.userAuth = tokenInfo;

    //Continuo

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = isUser;
