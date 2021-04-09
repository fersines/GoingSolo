import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";

const apiUrl = "http://localhost:3000";

export default function NewComment(data) {
  const { id } = useParams();
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState();
  const [post, setPost] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getPost = async () => {
      const headers = new Headers();

      headers.append("Content-Type", "application/json");
      headers.append("Authorization", token);
      try {
        const response = await fetch(`${apiUrl}/posts/${id}`, {
          method: "GET",
          headers: headers,
        });

        const json = await response.json();

        if (response.ok) {
          setPost(json.data);
        } else {
          throw new Error(json.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getPost();
  }, [token, id]);

  const headers = new Headers();
  if (token) {
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", token);
  }

  const body = new FormData();
  body.append("love", data.love);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${apiUrl}/posts/${post.id}/comments`, {
        headers: headers,
        method: "POST",
        body: JSON.stringify(data),
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <label htmlFor="comment">
          <h3>Deja aquí tu comentario</h3>
        </label>
        <input
          ref={register({ required: true })}
          type="text"
          name="comment"
          id="comment"
        />
      </fieldset>

      <button type="submit">Añadir Comentario</button>
      {errorMessage ? <p>{errorMessage}</p> : null}
    </form>
  );
}
