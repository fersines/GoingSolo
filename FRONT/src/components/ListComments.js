import { useEffect, useState } from "react";

const apiUrl = "http://localhost:3000";

export default function ListComments() {
  const [comments, setcomments] = useState([]);
  console.log(comments);

  const token = localStorage.getItem("token");

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", token);

  useEffect(() => {
    fetch(`${apiUrl}/comments`, { method: "GET", headers: headers })
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        console.log(results);
        setcomments(results.data);
      });
  }, []);

  return (
    <section>
      <h1>Aquí debería salir el listado de Comentarios</h1>
      <ul>
        {comments.map((comment) => {
          return <li key={comment.id}>{comment.comment}</li>;
        })}
      </ul>
    </section>
  );
}
