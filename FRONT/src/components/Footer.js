import { Link } from "react-router-dom";
import "../css/Footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div class="footer-links">
          <div className="footer-link-wrapper">
            <div class="terms">
              <h3>
                <Link to="/">Terminos del Servicio</Link>
              </h3>
            </div>
            <div class="privacidad">
              <h3>
                <Link to="/">Privacidad</Link>
              </h3>
            </div>
          </div>
          <div className="footer-link-wrapper">
            <div class="contacto">
              <h3>
                <Link to="/">Contacto</Link>
              </h3>
            </div>
            <div class="faq">
              <h3>
                <Link to="/">FAQ</Link>
              </h3>
            </div>
          </div>
        </div>
        <section class="social-media">
          <div class="social-media-wrap">
            <div class="footer-logo">
              <Link to="/" className="social-logo">
                <img
                  className="logoParlor"
                  src="images/logoParlor.png"
                  alt=""
                />
              </Link>
            </div>
            <small class="company">Sines Ltd.©2021</small>
            <div class="social-icons">
              <Link
                class="social-icon-link facebook"
                to="/"
                target="_blank"
                aria-label="Facebook"
              >
                <i class="fab fa-facebook-f" />
              </Link>
              <Link
                class="social-icon-link instagram"
                to="/"
                target="_blank"
                aria-label="Instagram"
              >
                <i class="fab fa-instagram" />
              </Link>
              <Link
                class="social-icon-link twitter"
                to="/"
                target="_blank"
                aria-label="Twitter"
              >
                <i class="fab fa-twitter" />
              </Link>
              <Link
                class="social-icon-link twitter"
                to="/"
                target="_blank"
                aria-label="LinkedIn"
              >
                <i class="fab fa-linkedin" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}
