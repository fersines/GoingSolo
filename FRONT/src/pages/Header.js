import { Link } from "react-router-dom";
import useAuth from "../shared/hooks/useAuth";

export default function Header() {
  const { isUserLogged, signOut, userData } = useAuth();

  if (isUserLogged) {
    if (userData.role === "admin") {
      return (
        <header className="logged">
          <Link to="/findposts">Buscar Links</Link>
          <Link to="/findcomments">Buscar Comentarios</Link>
          <Link to="/findusers">Buscar Usuarios</Link>
          <Link to="/loggeduser">Admin Home</Link>
          <Link to="/usersarea">Área personal</Link>
          <Link onClick={signOut}>Cerrar Sesión</Link>
        </header>
      );
    } else {
      return (
        <header className="logged">
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
      <header className="public">
        <div className="left">
          <h3>
            <img src="/logo.png" alt="logo altavoz" /> <Link to="/">Home</Link>
          </h3>
          <div className="right">
            <h3>
              <Link to="/login">Login</Link>
            </h3>

            <h3>
              <Link to="/register">Registro</Link>
            </h3>
          </div>
        </div>
      </header>
    );
  }
}
