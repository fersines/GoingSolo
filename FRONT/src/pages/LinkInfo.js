import { Link } from "react-router-dom";
import DeleteLink from "../components/DeleteLink";
import LinkDetails from "../components/LinkDetails";

export default function LinkInfo() {
  return (
    <>
      <LinkDetails></LinkDetails>
      <Link to="/editlink">Edita el Link</Link>
    </>
  );
}
