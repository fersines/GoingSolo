import { useParams } from "react-router-dom";

export default function LinkDetails() {
  const { id } = useParams();

  return <p>Detalles do Link id: {id}</p>;
}
