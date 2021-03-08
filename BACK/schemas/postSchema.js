const Joi = require("joi");

const postSchema = Joi.object().keys({
  link: Joi.string()
    .required()
    .uri()
    .error(new Error("No has facilitado una url válida")),
  title: Joi.string()
    .required()
    .min(7)
    .max(150)
    .error(new Error("El título ha de estar entre 7 y 150 caracteres")),
  story: Joi.string()
    .required()
    .min(33)
    .max(1000)
    .error(
      new Error(
        "El comentario a tu link ha de estar entre 33 y 1000 caracteres"
      )
    ),
});

module.exports = postSchema;
