const getDB = require("../../db");

const getUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //Saco la id del usuario de req.params
    const { id } = req.params;

    //Cojo la información del usuario
    const [user] = await connection.query(
      `
        SELECT id, date, email, name, avatar, role, active, deleted
        FROM users
        WHERE id=?
    `,
      [id]
    );

    //Creo la respuesta básica
    const userInfo = {
      name: user[0].name,
      avatar: user[0].avatar,
    };

    //Si el usuario solicitado coincide con el del token, añado datos privados
    if (user[0].id === req.userAuth.id || req.userAuth.role === "admin") {
      userInfo.date = user[0].date;
      userInfo.email = user[0].email;
      userInfo.role = user[0].role;
      userInfo.active = user[0].active;
      userInfo.deleted = user[0].deleted;
    }

    //Devuelvo respuesta
    res.send({
      status: "Ok",
      data: userInfo,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getUser;
