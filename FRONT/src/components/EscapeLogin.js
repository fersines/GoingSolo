import { Link } from "react-router-dom";

export default function EscapeLogin() {
  return (
    <div className="escape">
      <h5>Pero si ya estás registrado..., entonces haz click aquí!</h5>
      <button>
        <Link to="/login">Login</Link>
      </button>
    </div>
  );
}
