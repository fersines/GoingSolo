const apiLip = "http://localhost:3000";

/**
 * Este método es genérico y me va a servir para hacer peticiones en las que no se suban ficheros
 */

async function genericRequest(path, { body, method }) {
  const headers = new Headers({ "Content-Type": "application/json" });
  const response = await fetch(`${apiLip}${path}`, {
    method: method,
    headers: headers,
    body: JSON.stringify(body),
  });
  return response;
}

/**
 * Esta función hará peticiones de login
 */
export function login(loginData) {
  return genericRequest("/users/login", {
    method: "POST",
    body: loginData,
  });
}

/**
 * Esta función hará peticiones de login
 */
export function register(registerData) {
  return genericRequest("/users", {
    method: "POST",
    body: register,
  });
}
