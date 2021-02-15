require("dotenv").config();
const express = require("express");

const morgan = require("morgan");

//Controladores
const { listPosts, getPost } = require("./controllers/posts");

const { PORT } = process.env;

//Creamos la app de express
const app = express();

//Aplico middlewares
app.use(morgan("dev"));

//Rutas de la API

//GET - /posts
//Devuelve todos los posts publicados
app.get("/posts", listPosts);

//GET - /posts/:id
//Devuelve el detalle de un post
app.get("/posts/:id", getPost);

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
