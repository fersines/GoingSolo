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
    fetch(`${apiUrl}/users/${userData.id}/posts?order=date`, {
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
    return (
      <>
        <body className="body-mislinks">
          <section className="mislinks">
            <h1>Aquí verás tus Links, pero cuando los publiques...</h1>
          </section>
        </body>
      </>
    );
  } else {
    return (
      <>
        <body className="body-mislinks">
          <h1>Tus Links publicados</h1>
          <section className="mislinks">
            <ul>
              {posts.map((post) => {
                return (
                  <li key={post.id}>
                    <article>
                      <header>
                        <h3>{post.title}</h3>
                      </header>
                      <h4>
                        <a href={post.link}>{post.link}</a>{" "}
                      </h4>
                      <p>{post.story}</p>
                      <h5>Likes:{post.loves}</h5>

                      <Link to={`/link/${post.id}`}>Ver Detalle del Link</Link>
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
