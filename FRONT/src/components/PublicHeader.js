import { Link } from "react-router-dom";

export default function PublicHeader() {
  return (
    <header>
      <div class="footer-logo">
        <Link to="/" className="social-logo">
          <img className="logoLIU" src="images/logoLIU.png" alt="" />
        </Link>
      </div>
      <Link className="left" to="/">
        Home
      </Link>
      <Link className="right" to="/login">
        Login
      </Link>
      <Link className="right" to="/register">
        Registro
      </Link>
    </header>
  );
}
