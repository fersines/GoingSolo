require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

//Controladores
const {
  listPosts,
  getPost,
  newPost,
  editPost,
  deletePost,
  newComment,
  editComment,
  deleteComment,
} = require("./controllers/posts");

//Middlewares
const postExists = require("./middlewares/postExists");
const commentExists = require("./middlewares/commentExists");

const { PORT } = process.env;

//Creamos la app de express
const app = express();

//Aplico middlewares

//Logger
app.use(morgan("dev"));

//Body parser (body en JSON)
app.use(bodyParser.json());

//Body parser (multipart form data <= subida de imágenes)
app.use(fileUpload());

//Rutas de la API

//GET - /posts
//Devuelve todos los posts publicados
app.get("/posts", listPosts);

//GET - /posts/:id
//Devuelve el detalle de un post
app.get("/posts/:id", postExists, getPost);

//POST - /posts
//Crea un nuevo post
app.post("/posts", newPost);

//PUT - /posts
//Edita un post
app.put("/posts/:id", postExists, editPost);

//DELETE - /posts/:id
//Borra un post de la BBDD
app.delete("/posts/:id", postExists, deletePost);

//POST - /comments
//Crea un comentario a un Post
app.post("/comments", newComment);

//PUT - /comments/:id
//Edita un comentario
app.put("/comments/:id", commentExists, editComment);

//DELETE - /comments/:id
//Borra un comentario de la BBDD
app.delete("/comments/:id", commentExists, deleteComment);

//Middleware de error
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.httpStatus || 500).send({
    status: "error",
    message: error.message,
  });
});

//Middleware de 404
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not found",
  });
});

//Inicio el servidor
app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT} 🛫`);
});
