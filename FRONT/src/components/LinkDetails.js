import { useParams } from "react-router-dom";

export default function LinkDetails() {
  const { id } = useParams();

  console.log(id);

  return <p>Detalles do Link id: {id}</p>;
}
