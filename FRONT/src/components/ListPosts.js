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

  const stringDate = new Date();
  const miDate = stringDate.toString(posts.date);

  if (userData.role === "admin") {
    return (
      <section>
        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <Link to={`/link/${post.id}`}>
                  {post.link} {miDate}
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
    <section>
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <p>
                Link: <a href={post.link}>{post.link}</a>
              </p>
              <p>Publicado el: {miDate}</p>
              <p>Likes:{post.loves}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
