import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginForm(props) {
  const { register, handleSubmit, errors } = useForm();
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
    try {
      await props.signIn(data.email, data.password);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <>
      <body className="body-login">
        <section className="login">
          <h2>Accede con tus claves</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
              <input
                ref={register({ required: true })}
                name="email"
                id="email"
                placeholder="Correo Electrónico"
                autoComplete="username"
              />
              {errors.email && <p className="error">Falta email</p>}
            </fieldset>

            <fieldset>
              <input
                ref={register({ required: true, minLength: 1 })}
                name="password"
                type="password"
                id="password"
                placeholder="Contraseña"
                autoComplete="current-password"
              />
              {errors.password && <p className="error">Falta contraseña</p>}
            </fieldset>
            <button type="submit">Acceder</button>
            {errorMessage ? <p>{errorMessage}</p> : null}
          </form>

          <Link to="/newpassword">Has olvidado tu contraseña?</Link>

          <Link to="/register">Todavía no estás registrado?</Link>
        </section>
      </body>
    </>
  );
}
