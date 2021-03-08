const Joi = require("joi");

const commentSchema = Joi.object().keys({
  comment: Joi.string()
    .required()
    .min(33)
    .max(500)
    .error(new Error("El comentario ha de estar entre 33 y 500 caracteres")),
  post_id: Joi.number().required(),
});

module.exports = commentSchema;
