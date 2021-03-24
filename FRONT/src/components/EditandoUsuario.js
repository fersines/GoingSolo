import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../shared/hooks/useAuth";

const apiUrl = "http://localhost:3000";

export default function EditandoUsuario(data) {
  const { userData } = useAuth();

  const { register, handleSubmit, errors } = useForm();
  const [errorMessage, setErrorMessage] = useState();

  const token = localStorage.getItem("token");

  const headers = new Headers();
  if (token) {
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", token);
  }

  const body = new FormData();
  body.append("email", data.email);
  body.append("name", data.name);
  body.append("avatar", data.avatar);

  const onSubmit = async (data) => {
    try {
      await fetch(`${apiUrl}/users/${userData.id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data),
      });
    } catch (error) {
      setErrorMessage(error);
    }
  };
  console.log(data.email);
  console.log(data.name);
  console.log(userData.id);
  console.log(userData.email);
  return (
    <section>
      <h1>{"Nos alegra verte " + data.name + "!"}</h1>
      <h2>Estos son tus datos de perfil</h2>
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email</label>
          <input
            ref={register({ required: false })}
            type="email"
            name="email"
            id="email"
          />
          <label htmlFor="name">Tu nombre</label>
          <input
            ref={register({ required: false })}
            type="text"
            name="name"
            id="name"
          />
          <label htmlFor="avatar">Tu avatar</label>
          <input
            ref={register({ required: false })}
            type="file"
            name="avatar"
            id="avatar"
          />
          <label htmlFor="button">Si ya está todo...</label>
          <button type="submit">Guarda los cambios!</button>
          {errorMessage ? <p>{errorMessage}</p> : null}
        </form>
      </section>
    </section>
  );
}
