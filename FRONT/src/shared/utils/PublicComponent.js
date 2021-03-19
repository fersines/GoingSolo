import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PublicComponent({ children }) {
  const { isLogged } = useAuth();

  return <>{!isLogged ? children : <Link to="/login">Login</Link>}</>;
}
