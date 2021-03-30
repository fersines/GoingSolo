import { Link } from "react-router-dom";
import UserProfile from "../components/UserProfile";

export default function UserInfo() {
  return (
    <section>
      <>
        <UserProfile></UserProfile>
        <Link to="/edituser">Edita tu usuario</Link>
        <Link to="/editpassword">Cambia tu contraseña</Link>
      </>
    </section>
  );
}
