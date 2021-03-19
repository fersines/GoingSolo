import { Link } from "react-router-dom";
import "../css/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div class="terms">
        <h6>
          <Link to="/">Legal</Link>
        </h6>
      </div>
      <div class="privacidad">
        <h6>
          <Link to="/">Privacidad</Link>
        </h6>
      </div>
      <div class="contacto">
        <h6>
          <Link to="/">Contacto</Link>
        </h6>
      </div>
      <div class="faq">
        <h6>
          <Link to="/">FAQ</Link>
        </h6>
      </div>
      <div class="footer-logo">
        <Link to="/" className="social-logo">
          <img className="logoLIU" src="images/logoLIU.png" alt="" />
        </Link>
      </div>
      <small class="company">Sines Ltd.©2021</small>
    </footer>
  );
}
