import { Link } from "react-router-dom";
import useAuth from "../shared/hooks/useAuth";
import "../css/Header.css";

export default function Header() {
  const { isUserLogged, signOut, userData } = useAuth();

  if (isUserLogged) {
    if (userData.role === "admin") {
      return (
        <header>
          <Link to="/findposts">Buscar Posts</Link>
          <Link to="/findcomments">Buscar Comentarios</Link>
          <Link to="/findusers">Buscar Usuarios</Link>
          <Link to="/loggeduser">Admin Home</Link>
          <Link to="/usersarea">Área personal</Link>
          <Link onClick={signOut}>Cerrar Sesión</Link>
        </header>
      );
    } else {
      return (
        <header>
          <Link to="/nuevolink">Nuevo Link</Link>
          <Link to="/masvotados">Más votados</Link>
          <Link to="/miscomentarios">Mis Comentarios</Link>
          <Link to="/mislinks">Mis Links</Link>
          <Link to="/usersarea">Área personal</Link>
          <Link onClick={signOut}>Cerrar Sesión</Link>
        </header>
      );
    }
  } else {
    return (
      <header>
        <div className="footer-logo">
          <Link to="/" className="social-logo">
            <img className="logoLIU" src="images/logoLIU.png" alt="" />
          </Link>
        </div>
        <div className="left">
          <h3>
            <Link to="/">Home</Link>
          </h3>
        </div>
        <div className="right">
          <h3>
            <Link to="/login">Login</Link>
          </h3>
        </div>
        <div className="right">
          <h3>
            <Link to="/register">Registro</Link>
          </h3>
        </div>
      </header>
    );
  }
}
