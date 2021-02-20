require("dotenv").config();
const faker = require("faker");
const { random, now } = require("lodash");
const getDB = require("./db");
const { formateDateToDB } = require("./helpers");

let connection;

async function main() {
  try {
    connection = await getDB();

    //Borrar tablas existentes
    await connection.query("DROP TABLE IF EXISTS posts");
    console.log("Tabla posts borrada!");

    await connection.query("DROP TABLE IF EXISTS link_likes");
    console.log("Tabla lin_likes borrada!");

    await connection.query("DROP TABLE IF EXISTS link_comments");
    console.log("Tabla link_comments borrada!");

    await connection.query("DROP TABLE IF EXISTS users");
    console.log("Tabla de usuarios borrada!");

    //Creo tabla de usuarios
    await connection.query(`
      CREATE TABLE users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        date DATETIME NOT NULL,
        email VARCHAR(500) UNIQUE NOT NULL,
        password VARCHAR(500) NOT NULL,
        name VARCHAR(100),
        avatar VARCHAR(50),
        active BOOLEAN DEFAULT false,
        role ENUM("admin", "normal") DEFAULT "normal" NOT NULL,
        registrationCode VARCHAR(100)
      )
    `);
    console.log("Tabla users creada!");

    //Creo una tabla de links publicados
    await connection.query(`
            CREATE TABLE posts (
                id INT PRIMARY KEY AUTO_INCREMENT,
                date DATETIME NOT NULL,
                link VARCHAR(500) NOT NULL,
                title VARCHAR(150) NOT NULL,
                story VARCHAR(1000) NOT NULL,
                post_user_id INT NOT NULl
            );
        `);
    console.log("Tabla posts creada!");

    //Creo una tabla de links votados
    await connection.query(`
            CREATE TABLE link_likes (
                id INT PRIMARY KEY AUTO_INCREMENT,
                love_date DATETIME NOT NULL,
                love TINYINT NOT NULL,
                love_user_id INT NOT NULL,
                post_id INT NOT NULL
            );
    `);
    console.log("Tabla link_likes creada!");

    //Creo una tabla de comentarios a los posts
    await connection.query(`
            CREATE TABLE link_comments (
                id INT PRIMARY KEY AUTO_INCREMENT,
                comment_date DATETIME NOT NULL,
                comment VARCHAR(500) NOT NULL,
                comment_user_id INT NOT NULL,
                post_id INT NOT NULL
            );
    `);
    console.log("Tabla link_comments creada!");

    //Meto datos de prueba

    //Introduzco un usuario administrador
    await connection.query(`
              INSERT INTO users(date, email, password, name, active, role)
              VALUES ("${formateDateToDB(
                new Date()
              )}", "fsinesc@gmail.com", SHA2(${
      process.env.ADMIN_PASSWORD
    }, 512), "Fernando Sines", true, "admin");
    `);

    //Introduzco varios usuarios de prueba

    //Introduzco varios posts de prueba
    const posts = 100;

    for (let index = 0; index < posts; index++) {
      const now = new Date();
      await connection.query(`
        INSERT INTO posts(
          date, 
          link, 
          title, 
          story,
          post_user_id
          )
        VALUES (
          "${formateDateToDB(now)}",
          "${faker.internet.url()}",
          "${faker.lorem.words(7)}",
          "${faker.lorem.paragraph(1)}",
          "${faker.random.number(999)}"
          )
      `);
    }
    console.log("Posts de prueba creados");

    const likes = 100;

    for (let index = 0; index < likes; index++) {
      const now = new Date();
      await connection.query(`
        INSERT INTO link_likes(
          love_date,
          love,
          post_id
          )
        VALUES (
          "${formateDateToDB(now)}",
          "${random(1, 2)}",
          "${random(1, 75)}"
          )
      `);
    }
    console.log("Votos de prueba creados");

    const comments = 100;

    for (let index = 0; index < comments; index++) {
      const now = new Date();
      await connection.query(`
        INSERT INTO link_comments(
          comment_date,
          comment,
          comment_user_id,
          post_id 
          )
        VALUES (
          "${formateDateToDB(now)}",
          "${faker.lorem.paragraph()}",
          "${faker.random.number(999)}",
          "${random(1, 100)}"
          )
      `);
    }
    console.log("Comentarios de prueba creados");
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

main();
