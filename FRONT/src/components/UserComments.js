import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../shared/hooks/useAuth";

const apiUrl = "http://localhost:3000";

export default function UserComments() {
  const { userData } = useAuth();
  const [comments, setcomments] = useState([]);
  console.log(comments);

  const token = localStorage.getItem("token");

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", token);

  useEffect(() => {
    console.log(userData);
    fetch(`${apiUrl}/users/${userData.id}/comments`, {
      method: "GET",
      headers: headers,
    })
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        console.log(results);
        setcomments(results.data);
      });
  }, []);

  console.log(comments);

  if (comments.length === 0) {
    return <h1>Aquí verás tus Comentarios, pero cuando los publiques...</h1>;
  } else {
    const stringDate = new Date();
    const miDate = stringDate.toString(comments.date);
    return (
      <section>
        <h1>Estos son los Comentarios que has publicado hasta ahora</h1>
        <ul>
          {comments.map((comment) => {
            return (
              <li key={comment.id}>
                <Link to={`/comment/${comment.id}`}>
                  {comment.comment} {miDate}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}
