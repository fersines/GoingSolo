import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../shared/hooks/useAuth";

const apiUrl = "http://localhost:3000";

export default function ListPosts() {
  const { userData } = useAuth();
  const [posts, setposts] = useState([]);

  const [search, setSearch] = useState(searchsearch);
  console.log(posts);

  const token = localStorage.getItem("token");

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", token);

  useEffect(() => {
    fetch(`${apiUrl}/posts?search=${search}`, {
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

  console.log(posts[0]);

  if (userData.role === "admin") {
    return (
      <section>
        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <Link to={`/link/${post.id}`}>
                  {post.link} {new Date(post.date).toLocaleString("es-ES")}
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
