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
      <>
        <body className="body-listposts">
          <section className="listposts">
            <h2>Últimos Links</h2>
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
  } else {
  }
  return (
    <>
      <body className="body-listposts">
        <h2>Estos son los Links más populares</h2>
        <section className="listposts">
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
