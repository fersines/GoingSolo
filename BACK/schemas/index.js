const Joi = require("joi");

const registrationSchema = Joi.object().keys({
  email: Joi.string()
    .required()
    .email()
    .error(new Error("No has facilitado un email válido")),
  password: Joi.string()
    .required()
    .min(6)
    .max(33)
    .error(new Error("La contraseña ha de estar entre 6 y 33 caracteres")),
});

module.exports = {
  registrationSchema,
};
