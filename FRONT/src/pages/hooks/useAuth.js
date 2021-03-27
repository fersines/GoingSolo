import { useContext } from "react";
import { AuthContext } from "../../shared/context/authContext";

//Custom hook para usar el contexto de autenticación
export default function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
