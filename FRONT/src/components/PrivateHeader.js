import { Link } from "react-router-dom";
import useAuth from "../shared/hooks/useAuth";

export default function PrivateHeader() {
  const { signOut, userData } = useAuth();

  if (userData.role === "admin") {
    return (
      <header>
        <Link to="/findposts">Buscar Posts</Link>
        <Link to="/findcomments">Buscar Comentarios</Link>
        <Link to="/findusers">Buscar Usuarios</Link>
        <Link to="/loggeduser">Admin Home</Link>
        <Link to="/usersarea">Área personal</Link>
        <button onClick={signOut}>Bye!</button>
      </header>
    );
  } else {
  }
  return (
    <header>
      <Link to="/nuevolink">Nuevo Link</Link>
      <Link to="/masvotados">Más votados</Link>
      <Link to="/miscomentarios">Mis Comentarios</Link>
      <Link to="/mislinks">Mis Links</Link>
      <Link to="/usersarea">Área personal</Link>
      <button onClick={signOut}>Bye!</button>
    </header>
  );
}
