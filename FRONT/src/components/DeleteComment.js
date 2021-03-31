import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const apiUrl = "http://localhost:3000";

export default function DeleteComment(data) {
  const { id } = useParams();
  const [comment, setComment] = useState([]);
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getComment = async () => {
      const headers = new Headers();

      headers.append("Content-Type", "application/json");
      headers.append("Authorization", token);
      try {
        const response = await fetch(`${apiUrl}/comments/${id}`, {
          method: "DELETE",
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

      const body = new FormData();
      body.append("link", data.link);
      body.append("title", data.title);

      if (data.story.length) {
        body.append("avatar", data.avatar[0]);
      }

      const response = await fetch(`${apiUrl}/posts/${id}`, {
        method: "DELETE",
        headers: headers,
        body: body,
      });
      const json = await response.json();
      if (response.ok) {
      } else {
        throw new Error(json.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  if (!comment) return <p>Buscando Comentario...</p>;

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button type="submit">Borrar Usuario</button>
        {errorMessage ? <p>{errorMessage}</p> : null}
      </form>
    </section>
  );
}
