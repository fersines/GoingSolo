import { Link } from "react-router-dom";

export default function EscapeSignUp() {
  return (
    <div className="escape">
      <h5>Que todavía no estás registrado???..., pase usted por aquí!</h5>
      <button>
        <Link to="/users">Registro</Link>
      </button>
    </div>
  );
}
