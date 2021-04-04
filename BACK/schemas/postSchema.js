const Joi = require("joi");

const postSchema = Joi.object().keys({
  link: Joi.string()
    .required()
    .uri()
    .error(new Error("URL no válida, ha de empezar por http:")),
  title: Joi.string()
    .required()
    .min(7)
    .max(150)
    .error(new Error("El Título ha de estar entre 7 y 150 caracteres")),
  story: Joi.string()
    .required()
    .min(33)
    .max(1000)
    .error(
      new Error("El Story de tu link ha de estar entre 33 y 1000 caracteres")
    ),
});

module.exports = postSchema;
