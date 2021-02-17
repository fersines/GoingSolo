const { format } = require("date-fns");
const sharp = require("sharp");
const uuid = require("uuid");
const path = require("path");
const { ensureDir } = require("fs-extra");
const { UPLOADS_DIRECTORY } = process.env;
const uploadsDir = path.join(__dirname, UPLOADS_DIRECTORY);

function formateDateToDB(dateObject) {
  return format(dateObject, "yyyy-MM-dd HH:mm:ss");
}

async function saveImage(imageData) {
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

module.exports = {
  formateDateToDB,
  saveImage,
};
