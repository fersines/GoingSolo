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
    /* const stringDate = Date();
    const miDate = stringDate.toString(posts.date); */

    return (
      <>
        <section>
          <ul>
            {posts.map((post) => {
              return (
                <li key={post.id}>
                  <Link to={`/link/${post.id}`}>
                    {post.link} {post.date}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </>
    );
  }
}
