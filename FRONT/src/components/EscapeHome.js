import { Link } from "react-router-dom";
import "../css/Escapes.css";

export default function EscapeHome() {
  return (
    <div className="escape">
      <h5>Volver a la Home</h5>
      <button>
        <Link to="/">Home</Link>
      </button>
    </div>
  );
}
