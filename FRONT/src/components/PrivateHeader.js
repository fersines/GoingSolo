import { Link } from "react-router-dom";

export default function PrivateHeader() {
  return (
    <header>
      <Link to="/posts">Nuevo Link</Link>
      <Link to="/posts">Últimos</Link>
      <Link to="/posts">Registro</Link>
      <Link to="/posts">Login</Link>
      <Link to="/users/">Registro</Link>
    </header>
  );
}
