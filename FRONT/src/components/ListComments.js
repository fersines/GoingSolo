import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <>
      <body className="body-comments">
        <section>
          <ul>
            {comments.map((comment) => {
              return (
                <li key={comment.id}>
                  <Link to={`/comment/${comment.id}`}>
                    {comment.comment}{" "}
                    {new Date(comment.comment_date).toLocaleString("es-ES")}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </body>
    </>
  );
}
