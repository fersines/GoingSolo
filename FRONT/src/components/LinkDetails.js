import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DeleteLink from "./DeleteLink";

const apiUrl = "http://localhost:3000";

export default function LinkDetails() {
  const { id } = useParams();
  const [post, setpost] = useState([]);

  const token = localStorage.getItem("token");

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", token);

  useEffect(() => {
    fetch(`${apiUrl}/posts/${id}`, { method: "GET", headers: headers })
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        console.log(results);
        setpost(results.data);
      });
  }, []);

  const stringDate = new Date(post.date);
  const miDate = stringDate.toString();

  return (
    <section>
      <h1>Detalles del Link con id: {id}</h1>
      <h3>Link</h3>
      <p>{post.link}</p>
      <h3>Lo publicaste:</h3>
      <p>{miDate}</p>
      <h3>Título</h3>
      <p>{post.title}</p>
      <h3>Story</h3>
      <p>{post.story}</p>
      <div>
        <button>
          <Link to="/editlink">Edita el Link</Link>
        </button>
        <button>
          <DeleteLink></DeleteLink>
        </button>
      </div>
    </section>
  );
}
