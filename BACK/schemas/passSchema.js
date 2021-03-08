const Joi = require("joi");

const passSchema = Joi.object().keys({
  oldPassword: Joi.string()
    .required()
    .min(6)
    .max(33)
    .error(new Error("La contraseña ha de estar entre 6 y 33 caracteres")),
  newPassword: Joi.string()
    .required()
    .min(6)
    .max(33)
    .error(new Error("La contraseña ha de estar entre 6 y 33 caracteres")),
});

module.exports = passSchema;
