import { useState } from "react";
import { useForm } from "react-hook-form";
import EscapeHome from "./EscapeHome";
import EscapeLogin from "./EscapeLogin";

export default function SignUpForm(props) {
  const { register, handleSubmit, errors } = useForm();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    await props.signUp(data.email, data.password);
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
      <EscapeLogin></EscapeLogin>
      <EscapeHome></EscapeHome>
    </section>
  );
}
