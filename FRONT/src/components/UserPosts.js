import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../shared/hooks/useAuth";

const apiUrl = "http://localhost:3000";

export default function UserPosts() {
  const { userData } = useAuth();
  const [posts, setposts] = useState([]);
  console.log(posts);

  const token = localStorage.getItem("token");

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", token);

  useEffect(() => {
    console.log(userData);
    fetch(`${apiUrl}/users/${userData.id}/posts`, {
      method: "GET",
      headers: headers,
    })
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        console.log(results);
        setposts(results.data);
      });
  }, []);

  console.log(posts);

  if (posts.length === 0) {
    return <h1>Aquí verás tus Links, pero cuando los publiques...</h1>;
  } else {
    return (
      <>
        <h1>Estos son los Links que has publicado hasta ahora</h1>
        <section>
          <ul>
            {posts.map((post) => {
              return (
                <li key={post.id}>
                  <article>
                    <header>
                      <h1>{post.title}</h1>
                    </header>
                    <h3>
                      <a href={post.link}>{post.link}</a>{" "}
                    </h3>
                    <p>{post.story}</p>
                    <h5>Likes:{post.loves}</h5>
                    <button>
                      <Link to={`/link/${post.id}`}>Ver Detalle del Link</Link>
                    </button>
                  </article>
                </li>
              );
            })}
          </ul>
        </section>
      </>
    );
  }
}
