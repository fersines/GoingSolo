import { useForm } from "react-hook-form";
import { useState } from "react";
import EscapeSignUp from "./EscapeSignUp";
import EscapeHome from "./EscapeHome";

export default function AuthForm(props) {
  const { register, handleSubmit, errors } = useForm();
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
    try {
      await props.signIn(data.email, data.password);
    } catch (error) {
      setErrorMessage(error);
    }
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
        {errorMessage ? <p>{errorMessage}</p> : null}
      </form>
      <EscapeSignUp></EscapeSignUp>
      <EscapeHome></EscapeHome>
    </section>
  );
}
