import { Link } from "react-router-dom";

export default function PublicHeader() {
  return (
    <header>
      <Link className="left" to="/">
        Home
      </Link>
      <Link className="right" to="/login">
        Login
      </Link>
      <Link className="right" to="/users">
        Registro
      </Link>
    </header>
  );
}
