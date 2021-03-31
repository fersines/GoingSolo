import { useState } from "react";
import { useForm } from "react-hook-form";
import EscapeHome from "./EscapeHome";
import EscapeLogin from "./EscapeLogin";

export default function SignUpForm(props) {
  const { register, handleSubmit, errors } = useForm();
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
    try {
      await props.signUp(data.email, data.password);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  console.log(errors);

  return (
    <section className="page">
      <h1>Regístrate en Link It UP!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4 htmlFor="email">Email</h4>
        <input ref={register({ required: true })} name="email" id="email" />
        {errors.email && <p className="error">Falta email</p>}
        <h4 htmlFor="password">Contraseña</h4>
        <input
          ref={register({ required: true, minLength: 1 })}
          name="password"
          type="password"
          id="password"
        />
        {errors.password && <p className="error">Falta contraseña</p>}

        <button type="submit">Regístrate</button>
        {errorMessage ? <p>{errorMessage}</p> : null}
      </form>
    </section>
  );
}
