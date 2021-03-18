import { Link } from "react-router-dom";
import useAuth from "../shared/hooks/useAuth";

export default function PrivateHeader() {
  const { signOut } = useAuth();

  return (
    <header>
      <Link to="/posts">Nuevo Link</Link>
      <Link to="/users/:id/posts">Mis Links</Link>
      <Link to="/posts">Más votados</Link>
      <Link to="/posts">Más comentados</Link>
      <Link to="/usersarea">Área personal</Link>
      <button onClick={signOut}>Bye!</button>
    </header>
  );
}
