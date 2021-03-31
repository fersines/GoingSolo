import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const apiUrl = "http://localhost:3000";

export default function CommentDetails() {
  const { id } = useParams();
  const [comment, setcomment] = useState([]);

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

  const stringDate = new Date();
  const miDate = stringDate.toString(comment.comment_date);

  return (
    <section>
      <h1>Detalles del Comentarios con id: {id}</h1>
      <h3>Comentario</h3>
      <p>{comment.comment}</p>
      <h3>Fecha de publicación:</h3>
      <p>{miDate}</p>
      <h3>Comentado por:</h3>
      <p>{comment.comment_user_id}</p>
      <h3>Link publicado por:</h3>
      <p>{comment.post_id}</p>
    </section>
  );
}
