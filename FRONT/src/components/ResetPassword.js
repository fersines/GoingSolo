import { useState } from "react";
import { useForm } from "react-hook-form";

const apiUrl = "http://localhost:3000";

export default function ResetPassword(data) {
  const { register, handleSubmit, errors } = useForm();
  const [errorMessage, setErrorMessage] = useState();

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const body = new FormData();
  body.append("recoverCode", data.recoverCode);
  body.append("newPassword", data.newPassword);

  const onSubmit = async (data) => {
    try {
      await fetch(`${apiUrl}/users/reset-password`, {
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
      <h1>Desde aquí podrás recuperar tu Contraseña</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="recoverCode">
          Pon aquí el código que has recibido por email
        </label>
        <input
          ref={register({ required: true, minLength: 1 })}
          name="recoverCode"
          type="text"
          id="recoverCode"
        />

        <label htmlFor="newPassword">Elige una nueva Contraseña</label>
        <input
          ref={register({ required: true, minLength: 1 })}
          name="newPassword"
          type="password"
          id="newPassword"
        />

        <button type="submit">Recuperar Contraseña</button>
        {errorMessage ? <p>{errorMessage}</p> : null}
      </form>
    </div>
  );
}
