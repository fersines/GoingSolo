import React from "react";
import decodeToken from "../utils/decodeToken";
import { useState } from "react";
import { login, signUpApi } from "../../http/api";
import { useHistory } from "react-router-dom";

// 1 Creamos el contexto y exportamos para usar en el hook
export const AuthContext = React.createContext();
const AuthContextProvider = AuthContext.Provider;

// 2 Recuperamos el token del localStorage
const token = localStorage.getItem("token");
const tokenObject = decodeToken(token);

// 3 Creamos un custom provider
export function AuthProvider({ children }) {
  const [userData, setUserData] = useState(tokenObject);
  const [isUserLogged, setIsUserLogged] = useState(!!tokenObject);
  const history = useHistory();

  // Método para hacer log in desde los componentes
  const signIn = async (email, password) => {
    const loginData = await login(email, password);
    localStorage.setItem("token", loginData);
    const tokenObject = decodeToken(loginData);
    setUserData(tokenObject);
    setIsUserLogged(true);
    history.push("/loggeduser");
  };

  //Método para registrarse
  const signUp = async (email, password) => {
    const message = await signUpApi(email, password);
    return message("Tu usuario se ha registrado, comprueba tu mail");
  };

  // Método que borra las credenciales del localStorage y del state
  const signOut = () => {
    localStorage.removeItem("token");
    history.push("/login");
    setUserData(null);
    setIsUserLogged(false);
  };

  // 4 devolvemos el provider metiendole dentro los children
  return (
    <AuthContextProvider
      value={{ userData, isUserLogged, signIn, signOut, signUp }}
    >
      {children}
    </AuthContextProvider>
  );
}
