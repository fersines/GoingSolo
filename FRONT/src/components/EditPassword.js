import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../shared/hooks/useAuth";

const apiUrl = "http://localhost:3000";

export default function EditPassword(data) {
  const { userData } = useAuth();
  const { register, handleSubmit, errors } = useForm();
  const [errorMessage, setErrorMessage] = useState([]);

  const token = localStorage.getItem("token");

  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Authorization", token);

  const body = new FormData();
  if (token) {
    body.append("oldPassword", data.oldPasswordword);
    body.append("newPassword", data.newPassword);
  }

  console.log(data.oldPassword);
  console.log(data.newPassword);

  const onSubmit = async (data) => {
    try {
      await fetch(`${apiUrl}/users/${userData.id}/password`, {
        headers: headers,
        method: "PUT",
        body: JSON.stringify(data),
      });
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="oldPassword">Contraseña Actual</label>
        <input
          ref={register({ required: true, minLength: 1 })}
          name="oldPassword"
          type="password"
          id="oldPassword"
        />
        <label htmlFor="newPassword">Nueva contraseña</label>
        <input
          ref={register({ required: true, minLength: 1 })}
          name="newPassword"
          type="password"
          id="newPassword"
        />
        <button type="submit">Cambiar Contraseña</button>
        {errorMessage ? <p>{errorMessage}</p> : null}
      </form>
    </section>
  );
}
