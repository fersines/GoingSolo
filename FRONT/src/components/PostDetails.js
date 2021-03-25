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
    fetch(`${apiUrl}/posts/${posts.id}`, { method: "GET", headers: headers })
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        console.log(results);
        setposts(results.data);
      });
  }, []);

  return (
    <section>
      <h1>Aquí debería salir el detalle del post con id: {posts.id}</h1>
      <ul>
        {posts.map((post) => {
          return <li key={post.id}>{post.link}</li>;
        })}
      </ul>
    </section>
  );
}
