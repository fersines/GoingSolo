import React, { useState } from "react";
import { useHistory } from "react-router";
import { login } from "../../http/api";
import decodeToken from "../utils/decodeToken";

//Creo el contexto
export const AuthContext = React.createContext();
const AuthContextProvider = AuthContext.Provider;

const tokenData = decodeToken(localStorage.getItem("token"));

//Creo un custom provider
export function AuthProvider({ children }) {
  const history = useHistory();
  const [testData, setTestData] = useState([]);
  const [userData, setUserData] = useState(tokenData);
  const [isLogged, setisLogged] = useState(!!tokenData);

  //Función para iniciar sesión
  const signIn = async (loginData) => {
    const response = await login(loginData);
    const jsondata = await response.json();
    localStorage.setItem("token", jsondata.data.token);
    const userData = decodeToken(jsondata.data.token);
    setUserData(userData);
    setisLogged(true);
    history.push("/");
  };

  //Devuelvo los children del provider
  return (
    <AuthContextProvider
      value={{
        signIn: signIn,
        testData: testData,
        setTestData: setTestData,
        userData: userData,
        isLogged: isLogged,
      }}
    >
      {children}
    </AuthContextProvider>
  );
}
