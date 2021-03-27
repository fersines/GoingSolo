import { useEffect, useState } from "react";

const apiUrl = "http://localhost:3000";

export default function ListPosts() {
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

  return (
    <section>
      <h1>Aquí debería salir el listado de Posts</h1>
      <ul>
        {posts.map((post) => {
          return <li key={post.id}>{post.link}</li>;
        })}
      </ul>
    </section>
  );
}
