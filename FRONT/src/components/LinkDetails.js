import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuth from "../shared/hooks/useAuth";
import DeleteLink from "./DeleteLink";
import LoveLink from "./LoveLink";
import NewComment from "./NewComment";

const apiUrl = "http://localhost:3000";

export default function LinkDetails() {
  const { userData } = useAuth();
  const { id } = useParams();
  const [post, setpost] = useState([]);
  const [comments, setcomments] = useState([]);

  const [errorMessage, setErrorMessage] = useState();

  const token = localStorage.getItem("token");

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", token);

  useEffect(() => {
    fetch(`${apiUrl}/posts/${id}`, { method: "GET", headers: headers })
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        console.log(results);
        setpost(results.data);
      });
  }, []);
  console.log(post);

  useEffect(() => {
    fetch(`${apiUrl}/posts/${id}/comments`, { method: "GET", headers: headers })
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        console.log(results);
        setcomments(results.data);
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

  if (userData.role === "admin" || userData.id === post.post_user_id) {
    return (
      <section>
        <h1>Detalles del Link {id}</h1>
        <h3>Link</h3>
        <p>{post.link}</p>
        <h3>Día y hora de publicación:</h3>
        <p>{new Date(post.date).toLocaleString("es-ES")}</p>{" "}
        {userData.role === "admin" ? (
          <h3>por el usuario con id: {post.post_user_id}</h3>
        ) : null}
        <h3>Título</h3>
        <p>{post.title}</p>
        <h3>Story</h3>
        <p>{post.story}</p>
        <h3>Comentarios</h3>
        <ul>
          {comments.length > 0 ? (
            comments.map((comment) => {
              return (
                <li key={comment.id}>
                  {comment.comment} Publicado:
                  {new Date(comment.comment_date).toLocaleString("es-ES")}
                </li>
              );
            })
          ) : (
            <p>Este Lint todavía no ha sido comentado</p>
          )}
        </ul>
        <div>
          <button>
            <Link to={`/link/${id}/edit`}>Edita el Link</Link>
          </button>
          <button>
            <DeleteLink></DeleteLink>
          </button>
        </div>
      </section>
    );
  } else {
    return (
      <section>
        <h1>Detalles del Link {id}</h1>
        <h3>Link</h3>
        <p>
          {post.link} <LoveLink></LoveLink>
        </p>

        <h3>Día y hora de publicación:</h3>
        <p>{new Date(post.date).toLocaleString("es-ES")}</p>
        <h3>Título</h3>
        <p>{post.title}</p>
        <h3>Story</h3>
        <p>{post.story}</p>
        <h3>Comentarios</h3>
        <ul>
          {comments.length > 0 ? (
            comments.map((comment) => {
              return (
                <li key={comment.id}>
                  {comment.comment} Publicado:
                  {new Date(comment.comment_date).toLocaleString("es-ES")}
                  <button onClick={() => likeComment(comment.id)}>
                    LoveIt!
                  </button>
                </li>
              );
            })
          ) : (
            <p>Este Link todavía no ha sido comentado</p>
          )}
        </ul>
        {errorMessage ? <p>{errorMessage}</p> : null}
        <div>
          <NewComment></NewComment>
        </div>
      </section>
    );
  }
}
