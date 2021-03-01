const { format } = require("date-fns");
const sharp = require("sharp");
const uuid = require("uuid");
const path = require("path");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");
const { ensureDir, unlink } = require("fs-extra");

const { UPLOADS_DIRECTORY } = process.env;
const uploadsDir = path.join(__dirname, UPLOADS_DIRECTORY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function formateDateToDB(dateObject) {
  return format(dateObject, "yyyy-MM-dd HH:mm:ss");
}

async function deletePhoto(photo) {
  const photoPath = path.join(uploadsDir, photo);

  await unlink(photoPath);
}

async function savePhoto(imageData) {
  //imageData es el objeto con información de la imagen

  //Asegurar que exista el directorio de subida
  await ensureDir(uploadsDir);

  //Leer la imagen con sharp
  const image = sharp(imageData.data);

  //Compruebo tamaño de imagen
  const imageInfo = await image.metadata();

  //Redimensiono si el tamaño es mayor
  const IMAGE_MAX_WIDTH = 1000;
  if (imageInfo.width > IMAGE_MAX_WIDTH) {
    image.resize(IMAGE_MAX_WIDTH);
  }

  //Genero nombre único
  const savedImageName = `${uuid.v4()}.jpg`;

  //Guardo la imagen en el directorio correspondiente
  await image.toFile(path.join(uploadsDir, savedImageName));

  //Devuelvo el nombre del fichero
  return savedImageName;
}

function generateRandomString(length) {
  return crypto.randomBytes(length).toString("hex");
}

async function sendMail({ to, subject, body }) {
  try {
    const msg = {
      to,
      from: process.env.SENDGRID_FROM,
      subject,
      text: body,
      html: `
        <div>
          <h1>${subject}</h1>
          <p>${body}</p>
        </div>
      `,
    };

    await sgMail.send(msg);
  } catch (error) {
    throw new Error("Error enviando mail");
  }
}

module.exports = {
  formateDateToDB,
  savePhoto,
  deletePhoto,
  generateRandomString,
  sendMail,
};
