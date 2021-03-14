//Descodifica la información de usuario de un token JWT
export default function decodeToken(token) {
  if (!token) {
    return null;
  }
  //Separo el token por los "." y cogemos "el trozo" central
  const userDataString = token.split(".")[1];
  //Reconstruyo el objeto con los datos del usuario
  const userDataDecoded = JSON.parse(atob(userDataString));
  return userDataDecoded;
}
