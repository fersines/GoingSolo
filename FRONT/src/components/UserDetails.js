import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import DeleteUser from "./DeleteUser";

const apiUrl = "http://localhost:3000";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setuser] = useState([]);
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState();

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

  const onSubmit = async (data) => {
    try {
      const headers = new Headers();
      headers.append("Authorization", token);

      const body = new FormData();
      body.append("email", data.email);
      body.append("name", data.name);

      const response = await fetch(`${apiUrl}/users/${id}`, {
        method: "PUT",
        headers: headers,
        body: body,
      });
      const json = await response.json();
      if (response.ok) {
        history.push("/findusers");
      } else {
        throw new Error(json.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <body className="body-linkdetails">
        <section className="linkdetails">
          <h1>Perfil del Usuario con id: {id}</h1>

          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset>
                <h3>Email</h3>
                <input
                  ref={register({ required: false })}
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={user.email}
                />
              </fieldset>
              <fieldset>
                <h3>Nombre</h3>
                <input
                  ref={register({ required: false })}
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={user.name}
                />
              </fieldset>

              <button type="submit">Edita el usuario</button>
              {errorMessage ? <p>{errorMessage}</p> : null}
            </form>
            <h3>Activo</h3>
            <p>
              {user.active === 1 ? (
                <p>El usuario está activado</p>
              ) : (
                <p>El usuario está pendiente de activación</p>
              )}
            </p>
            <h3>Eliminado</h3>
            <p>
              {user.deleted === 0 ? (
                <p>Este Usuario no está Eliminado</p>
              ) : (
                <p>Este Usuario ha sido Eliminado</p>
              )}
            </p>
          </div>
          <div>
            <DeleteUser></DeleteUser>
          </div>
        </section>
      </body>
    </>
  );
}
