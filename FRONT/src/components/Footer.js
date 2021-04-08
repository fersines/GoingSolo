import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="terms">
        <h6>
          <Link to="/">Legal</Link>
        </h6>
      </div>
      <div className="privacidad">
        <h6>
          <Link to="/">Privacidad</Link>
        </h6>
      </div>
      <div className="contacto">
        <h6>
          <Link to="/">Contacto</Link>
        </h6>
      </div>
      <div className="faq">
        <h6>
          <Link to="/">FAQ</Link>
        </h6>
      </div>
      <div className="footer-logo">
        <Link to="/" className="social-logo">
          <img className="logoLIU" src="images/logoLIU.png" alt="" />
        </Link>
      </div>
      <small className="company">Sines Ltd.©2021</small>
    </footer>
  );
}
