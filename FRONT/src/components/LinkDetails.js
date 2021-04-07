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

  console.log(post.comments);

  if (userData.role === "admin" || userData.id === post.post_user_id) {
    return (
      <section>
        <h1>Detalles del Link {id}</h1>
        <h3>Link</h3>
        <p>{post.link}</p>
        <h3>Fue publicado:</h3>
        <p>{new Date(post.date).toLocaleString("es-ES")}</p>
        <h3>Título</h3>
        <p>{post.title}</p>
        <h3>Story</h3>
        <p>{post.story}</p>
        <h3>Comentarios</h3>
        <ul>
          {comments.map((comment) => {
            if (post.id === comment.post_id) {
              return (
                <li key={comment.id}>
                  <Link to={`/comment/${comment.id}`}>
                    {comment.comment} Publicado:
                    {new Date(comment.comment_date).toLocaleString("es-ES")}
                  </Link>
                </li>
              );
            } else {
              return <p>Este Link no tiene comentarios</p>;
            }
          })}
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

        <h3>Fue publicado:</h3>
        <p>{new Date(post.date).toLocaleString("es-ES")}</p>
        <h3>Título</h3>
        <p>{post.title}</p>
        <h3>Story</h3>
        <p>{post.story}</p>
        <h3>Comentarios</h3>
        <ul>
          {comments.map((comment) => {
            if (!comment) {
              return <p>Este Link no tiene comentarios</p>;
            } else {
              return (
                <li key={comment.id}>
                  <Link to={`/comment/${comment.id}`}>
                    {comment.comment} Publicado:
                    {new Date(comment.comment_date).toLocaleString("es-ES")}
                  </Link>
                </li>
              );
            }
          })}
        </ul>
        <div>
          <NewComment></NewComment>
        </div>
      </section>
    );
  }
}
