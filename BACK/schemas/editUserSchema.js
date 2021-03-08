const Joi = require("joi");

const editUserSchema = Joi.object().keys({
  name: Joi.string()
    .min(5)
    .max(100)
    .error(new Error("El nombre ha de estar entre 5 y 100 caracteres")),
  email: Joi.string()
    .required()
    .email()
    .error(new Error("No has facilitado un email válido")),
});

module.exports = editUserSchema;
