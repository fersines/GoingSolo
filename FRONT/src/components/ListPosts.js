import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../shared/hooks/useAuth";

const apiUrl = "http://localhost:3000";

export default function ListPosts() {
  const { userData } = useAuth();
  const [posts, setposts] = useState([]);
  console.log(posts);

  const token = localStorage.getItem("token");

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", token);

  useEffect(() => {
    fetch(`${apiUrl}/posts`, { method: "GET", headers: headers })
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        console.log(results);
        setposts(results.data);
      });
  }, []);

  console.log(posts[0]);

  if (userData.role === "admin") {
    return (
      <section className="listposts">
        <h1>Últimos Links</h1>
        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <Link to={`/link/${post.id}`}>
                  <p>{post.link}</p>{" "}
                  <p>{new Date(post.date).toLocaleString("es-ES")}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    );
  } else {
  }
  return (
    <section className="listposts">
      <h1>Links más populares</h1>
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <p>
                Link: <a href={post.link}>{post.link}</a>
              </p>
              <p>Title: {post.title}</p>
              <p>Likes:{post.loves}</p>
              <button>
                <Link to={`/link/${post.id}`}>Ver Detalle del Link</Link>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
