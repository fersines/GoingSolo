import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function SignUpForm(props) {
  const { register, handleSubmit, errors } = useForm();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    await props.signUpApi(data.email, data.password);
  };

  console.log(errors);

  return (
    <section className="page">
      <h1>Regístrate en Link It UP!</h1>
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
        <button type="submit">Regístrate</button>
      </form>
      <h5>Pero si ya estás registrado..., entonces haz click aquí!</h5>
      <button>
        <Link to="/login">Login</Link>
      </button>
      <h5>O si lo prefieres, puedes volver a la Home</h5>
      <button>
        <Link to="/">Home</Link>
      </button>
    </section>
  );
}
