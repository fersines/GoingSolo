import { useState } from "react";
import { useForm } from "react-hook-form";

const apiUrl = "http://localhost:3000";

export default function ResetPassword(data) {
  const { register, handleSubmit } = useForm();
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
    <>
      <body className="body-resetpass">
        <section className="resetpass">
          <h1>Si has recibido el código de recuperación</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
              <input
                ref={register({ required: true, minLength: 1 })}
                name="recoverCode"
                type="text"
                id="recoverCode"
                placeholder="Código Recibido"
              />
            </fieldset>
            <fieldset>
              <input
                ref={register({ required: true, minLength: 1 })}
                name="newPassword"
                type="password"
                id="newPassword"
                placeholder="Nueva Contraseña"
              />
            </fieldset>

            <button type="submit">Restablecer Contraseña</button>
            {errorMessage ? <p>{errorMessage}</p> : null}
          </form>
        </section>
      </body>
    </>
  );
}
