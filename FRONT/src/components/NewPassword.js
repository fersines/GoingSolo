import { useState } from "react";
import { useForm } from "react-hook-form";

const apiUrl = "http://localhost:3000";

export default function NewPassword(data) {
  const { register, handleSubmit, errors } = useForm();
  const [errorMessage, setErrorMessage] = useState();

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const body = new FormData();
  body.append("email", data.email);

  const onSubmit = async (data) => {
    try {
      await fetch(`${apiUrl}/users/recover-password`, {
        headers: headers,
        method: "POST",
        body: JSON.stringify(data),
      });
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <div className="page">
      <h1>Déjanos tu email para recuperar tu contraseña</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Tu email</label>
        <input
          ref={register({ required: true, minLength: 1 })}
          name="email"
          type="email"
          id="email"
        />

        <button type="submit">Nueva Contraseña</button>
        {errorMessage ? <p>{errorMessage}</p> : null}
      </form>
    </div>
  );
}
