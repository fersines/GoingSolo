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
    return (
      <>
        <body className="body-usercomments">
          <section className="usercomments">
            <h1>Aquí verás tus Comentarios, pero cuando los publiques...</h1>
          </section>
        </body>
      </>
    );
  } else {
    return (
      <>
        <body className="body-usercomments">
          <h1>Mis Comentarios</h1>
          <section className="usercomments">
            <ul>
              {comments.map((comment) => {
                return (
                  <li key={comment.id}>
                    <article>
                      <header>
                        <h3>
                          {" "}
                          Publicado:{" "}
                          {new Date(comment.comment_date).toLocaleString(
                            "es-ES"
                          )}
                        </h3>
                      </header>
                      <h4>
                        <Link to={`/comment/${comment.id}`}>
                          {comment.comment}{" "}
                        </Link>
                      </h4>
                    </article>
                  </li>
                );
              })}
            </ul>
          </section>
        </body>
      </>
    );
  }
}
