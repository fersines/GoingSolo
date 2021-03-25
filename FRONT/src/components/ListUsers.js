import { useEffect, useState } from "react";

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
      <h1>Aquí debería salir el listado de Posts</h1>
      <ul>
        {users.map((user) => {
          return <li key={user.id}>{user.id}</li>;
        })}
      </ul>
    </section>
  );
}
