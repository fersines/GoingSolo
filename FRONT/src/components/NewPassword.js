import { useState } from "react";
import { useForm } from "react-hook-form";

const apiUrl = "http://localhost:3000";

export default function NewPassword(data) {
  const { register, handleSubmit } = useForm();
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
    <>
      <body className="body-newpass">
        <section className="newpass">
          <h1>Si has olvidado tu Contraseña</h1>
          <h4>(Recibirás un código para poder recuperarla)</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
              <input
                ref={register({ required: true, minLength: 1 })}
                name="email"
                type="email"
                id="email"
                placeholder="Correo Electrónico"
              />
            </fieldset>

            <button type="submit">Recuperar Contraseña</button>
            {errorMessage ? <p>{errorMessage}</p> : null}
          </form>
        </section>
      </body>
    </>
  );
}
