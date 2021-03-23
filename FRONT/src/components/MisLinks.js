import { useEffect, useState } from "react";
import useAuth from "../shared/hooks/useAuth";

const apiUrl = "http://localhost:3000";

export default function MisLinks() {
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

  return (
    <section>
      <h1>Aquí saldría el listado con los links del usuario</h1>
      <ul>
        {posts.map((post) => {
          return <li key={post.id}>{post.link}</li>;
        })}
      </ul>
    </section>
  );
}
