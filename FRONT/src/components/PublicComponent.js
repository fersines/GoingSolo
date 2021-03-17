import { Link } from "react-router-dom";
import Login from "../pages/Login";
import useAuth from "../shared/hooks/useAuth";

export default function PublicComponent({ children }) {
  const { isLogged } = useAuth();

  return <>{!isLogged ? children : <Link to="/login">Login</Link>}</>;
}
