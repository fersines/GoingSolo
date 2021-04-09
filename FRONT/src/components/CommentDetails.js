import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuth from "../shared/hooks/useAuth";
import DeleteComment from "./DeleteComment";

const apiUrl = "http://localhost:3000";

export default function CommentDetails() {
  const { userData } = useAuth();
  const { id } = useParams();
  const [comment, setcomment] = useState([]);

  const [errorMessage, setErrorMessage] = useState();

  const token = localStorage.getItem("token");

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", token);

  useEffect(() => {
    fetch(`${apiUrl}/comments/${id}`, { method: "GET", headers: headers })
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        console.log(results);
        setcomment(results.data);
      });
  }, []);

  const likeComment = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/comments/${id}/likes`, {
        headers: headers,
        method: "POST",
        body: JSON.stringify({ love: 1 }),
      });
      const json = await response.json();
      if (response.ok) {
        alert("pon esto bonito (like a comentario hecho)");
      } else {
        throw new Error(json.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  if (userData.role === "admin" || userData.id === comment.comment_user_id) {
    return (
      <section className="commentdetails">
        <h1>Detalles del Comentario {id}</h1>
        <h3>Comentario</h3>
        <p>{comment.comment}</p>
        <h3>Día y hora de publicación:</h3>
        <p>{new Date(comment.comment_date).toLocaleString("es-ES")}</p>
        <h3>Comentado por el usuario con id:</h3>
        <p>{comment.comment_user_id}</p>
        <h3>Link publicado por el usuario con id:</h3>
        <p>{comment.post_id}</p>
        <div>
          <Link to={`/comment/${id}/edit`}>Edita el Comentario</Link>

          <DeleteComment></DeleteComment>
        </div>
      </section>
    );
  } else {
    return (
      <section className="commentdetails">
        <h1>Detalles del Comentario {id}</h1>
        <h3>Comentario</h3>
        <p>{comment.comment}</p>
        <h3>Día y hora de publicación:</h3>
        <p>{new Date(comment.comment_date).toLocaleString("es-ES")}</p>
        <h3>Comentado por el usuario con id:</h3>
        <p>{comment.comment_user_id}</p>
        <h3>Link publicado por el usuario con id:</h3>
        <p>{comment.post_id}</p>
        <button onClick={() => likeComment(comment.id)}>LoveIt!</button>
      </section>
    );
  }
}
