const Joi = require("joi");

const passSchema = Joi.object().keys({
  recoverCode: Joi.string()
    .required()
    .min(6)
    .max(100)
    .error(new Error("La longitud del recoverCode no es válida")),

  newPassword: Joi.string()
    .required()
    .min(6)
    .max(33)
    .error(new Error("La contraseña ha de estar entre 6 y 33 caracteres")),
});

module.exports = passSchema;
