import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import useAuth from "../shared/hooks/useAuth";
import CommentDetails from "./CommentDetails";
import LoveLink from "./LoveLink";

const apiUrl = "http://localhost:3000";

export default function EditComment(data) {
  const history = useHistory();
  const { userData } = useAuth();
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

      const body = new FormData();
      body.append("link", data.comment);

      const response = await fetch(`${apiUrl}/comments/${comment.id}`, {
        method: "PUT",
        headers: headers,
        body: body,
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

  if (userData.role === "admin" || userData.id === comment.comment_user_id) {
    return (
      <section>
        <h2>Este es el detalle del Link a editar</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="comment">Comentario</label>
          <input
            ref={register({ required: false })}
            type="text"
            name="link"
            id="link"
            defaultValue={comment.comment}
          />

          <button type="submit">Guarda los cambios!</button>
          {errorMessage ? <p>{errorMessage}</p> : null}
        </form>
      </section>
    );
  } else {
    return (
      <section>
        <CommentDetails></CommentDetails>
      </section>
    );
  }
}
