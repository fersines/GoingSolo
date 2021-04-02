import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const apiUrl = "http://localhost:3000";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setuser] = useState([]);

  const token = localStorage.getItem("token");

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", token);

  useEffect(() => {
    fetch(`${apiUrl}/users/${id}`, { method: "GET", headers: headers })
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        console.log(results);
        setuser(results.data);
      });
  }, []);

  console.log(user);

  return (
    <section>
      <h1>Perifl del Usuario con id: {id}</h1>
      <h3>Email</h3>
      <p>{user.email}</p>
      <h3>Nombre</h3>
      <p>{user.name}</p>
      <h3>Activo</h3>
      <p>
        {user.active === "1" ? (
          <p>El usuario está activado</p>
        ) : (
          <p>El usuario está pendiente de activación</p>
        )}
      </p>
      <h3>Eliminado</h3>
      <p>
        {user.deleted === "0" ? (
          <p>Este Usuario no está Eliminado</p>
        ) : (
          <p>Este Usuario ha sido Eliminado</p>
        )}
      </p>
    </section>
  );
}
