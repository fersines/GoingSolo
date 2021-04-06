import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";

const apiUrl = "http://localhost:3000";

export default function DeleteComment(data) {
  const { id } = useParams();
  const history = useHistory();
  const [comment, setComment] = useState([]);
  const { handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getComment = async () => {
      const headers = new Headers();

      headers.append("Content-Type", "application/json");
      headers.append("Authorization", token);
      try {
        const response = await fetch(`${apiUrl}/comments/${id}`, {
          method: "GET",
          headers: headers,
        });

        const json = await response.json();

        if (response.ok) {
          setComment(json.data);
        } else {
          throw new Error(json.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getComment();
  }, [token, id]);

  const onSubmit = async (data) => {
    try {
      const headers = new Headers();
      headers.append("Authorization", token);

      const response = await fetch(`${apiUrl}/comments/${id}`, {
        method: "DELETE",
        headers: headers,
      });
      const json = await response.json();
      if (response.ok) {
        history.push("/miscomentarios");
      } else {
        throw new Error(json.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  if (!comment) return <p>Buscando Comentario...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button type="submit">Eliminar Comentario</button>
      {errorMessage ? <p>{errorMessage}</p> : null}
    </form>
  );
}
