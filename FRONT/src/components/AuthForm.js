import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AuthForm(props) {
  const { register, handleSubmit, errors } = useForm();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    await props.signIn(data.email, data.password);
  };

  console.log(errors);

  return (
    <section className="page">
      <h1>Inicia tu sesión</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input ref={register({ required: true })} name="email" id="email" />
        {errors.email && <p className="error">Falta email</p>}
        <label htmlFor="password">Tu contraseña</label>
        <input
          ref={register({ required: true, minLength: 1 })}
          name="password"
          type="password"
          id="password"
        />
        {errors.password && <p className="error">Falta contraseña</p>}
        <label htmlFor="button">Vamos!</label>
        <button type="submit">Entra</button>
      </form>
      <h5>Que todavía no estás registrado???..., pase usted por aquí!</h5>
      <button>
        <Link to="/users">Registro</Link>
      </button>
      <h5>O si lo prefieres, puedes volver a la Home</h5>
      <button>
        <Link to="/">Home</Link>
      </button>
    </section>
  );
}
