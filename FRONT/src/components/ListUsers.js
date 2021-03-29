import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const apiUrl = "http://localhost:3000";

export default function ListPosts() {
  const [users, setusers] = useState([]);
  console.log(users);

  const token = localStorage.getItem("token");

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", token);

  useEffect(() => {
    fetch(`${apiUrl}/users/list`, { method: "GET", headers: headers })
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        console.log(results);
        setusers(results.data);
      });
  }, []);

  return (
    <section>
      <h1>Este es el listado de Usuarios</h1>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              <Link to={`/user/${user.id}`}>{user.email}</Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
