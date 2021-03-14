import { useContext } from "react";
import { AuthContext } from "../context/authContext";

//Custom hook para usar el contexto de autentiación
export default function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
