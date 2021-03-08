const Joi = require("joi");

const newPassSchema = Joi.string()
  .required()
  .min(6)
  .max(33)
  .error(new Error("La contraseña ha de estar entre 6 y 33 caracteres"));

module.exports = newPassSchema;
