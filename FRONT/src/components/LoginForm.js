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
    <section className="page">
      <h1>Accede con tu claves</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          ref={register({ required: true })}
          name="email"
          id="email"
          placeholder="Correo Electrónico"
          autoComplete="username"
        />
        {errors.email && <p className="error">Falta email</p>}

        <input
          ref={register({ required: true, minLength: 1 })}
          name="password"
          type="password"
          id="password"
          placeholder="Contraseña"
          autoComplete="current-password"
        />
        {errors.password && <p className="error">Falta contraseña</p>}

        <button type="submit">Acceder</button>
        {errorMessage ? <p>{errorMessage}</p> : null}
      </form>
      <div>
        <button>
          <Link to="/newpassword">Has olvidado tu contraseña?</Link>
        </button>
        <button>
          <Link to="/register">Todavía no estás registrado?</Link>
        </button>
      </div>
    </section>
  );
}
