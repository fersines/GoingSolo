import { Link } from "react-router-dom";

export default function EscapeSignUp() {
  return (
    <div className="escape">
      <h5>No estás registrado?, aquí puedes hacerlo!</h5>
      <button>
        <Link to="/register">Registro</Link>
      </button>
    </div>
  );
}
