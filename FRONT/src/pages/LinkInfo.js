import { Link } from "react-router-dom";
import LinkDetails from "../components/LinkDetails";

export default function LinkInfo() {
  return (
    <>
      <LinkDetails></LinkDetails>
      <Link to="/editlink">Edita el Link</Link>
      <Link to="/editpassword">Cambia tu contraseña</Link>
    </>
  );
}
