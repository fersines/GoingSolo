require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

//Controladores de Posts
const {
  listPosts,
  getPost,
  newPost,
  editPost,
  deletePost,
  newComment,
  editComment,
  deleteComment,
  lovePost,
} = require("./controllers/posts");

//Controladores de Usuarios
const {
  newUser,
  validateUser,
  loginUser,
  getUser,
  deleteUser,
} = require("./controllers/users");

//Middlewares
const {
  canEditComment,
  canEditPost,
  commentExists,
  isUser,
  postExists,
  userExists,
} = require("./middlewares");

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

//Rutas de la API para Posts

//GET - /posts
//Devuelve todos los posts publicados
app.get("/posts", isUser, listPosts);

//GET - /posts/:id
//Devuelve el detalle de un post
app.get("/posts/:id", isUser, postExists, getPost);

//POST - /posts (con Token)
//Crea un nuevo post
app.post("/posts", isUser, newPost);

//PUT - /posts
//Edita un post
app.put("/posts/:id", isUser, postExists, canEditPost, editPost);

//DELETE - /posts/:id
//Borra un post de la BBDD
app.delete("/posts/:id", isUser, postExists, canEditPost, deletePost);

//POST - /comments
//Crea un comentario a un Post
app.post("/comments", isUser, newComment);

//PUT - /comments/:id
//Edita un comentario
app.put("/comments/:id", isUser, commentExists, canEditComment, editComment);

//DELETE - /comments/:id
//Borra un comentario de la BBDD
app.delete(
  "/comments/:id",
  isUser,
  commentExists,
  canEditComment,
  deleteComment
);

//POST - /posts/:id/loves
//Da like a un Post
app.post("/posts/:id/likes", isUser, postExists, lovePost);

//Rutas de la API para Users

//POST - /users
//Registra un nuevo usuario sin validar
app.post("/users", newUser);

//GET - /users/validate/:registrationCode
//Valida un usuario recien dado de alta
app.get("/users/validate/:registrationCode", validateUser);

//POST - /users/login
//Hace login de un Usuario
app.post("/users/login", loginUser);

//GET - /users/:id
//Devuelve el detalle de un usuario
app.get("/users/:id", userExists, isUser, getUser);

//DELETE - /users/:id
//"Desactiva" el usuario
app.delete("/users/:id", userExists, isUser, deleteUser);

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
