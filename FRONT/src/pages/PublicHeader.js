import { Link } from "react-router-dom";

export default function PublicHeader() {
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
