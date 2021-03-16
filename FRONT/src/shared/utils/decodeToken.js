//Descodifica la información de usuario de un token JWT
export default function decodeToken(token) {
  if (!token) {
    return null;
  }
  const tokenPieces = token.split(".");
  const tokenBase64 = tokenPieces[1];
  const decodedToken = atob(tokenBase64);
  return JSON.parse(decodedToken);
}
