import { useState } from "react";
import { useForm } from "react-hook-form";

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

  return (
    <section className="page">
      <h1>Alístate en Link It UP!</h1>
      <div class="intro">
        <p>
          ¿Quieres ser parte de la comunidad de LinkItUP!? Este puede ser tu
          "Speakers' Corner" virtual.
        </p>
        <ul>
          <li>
            <b>¿Quieres que todos nos enteremos de eso con lo que flipas?</b>
          </li>
          <li>
            <b>¿Quieres que el mundo sepa eso que aborreces?</b>
          </li>
          <li>
            <b>¿O quieres saber lo que a los demás nos flipa o aborrece?</b>
          </li>
        </ul>
        <p>Sea por el motivo que sea, aquí encontrarás tu sitio.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          ref={register({ required: true })}
          name="email"
          id="email"
          placeholder="Correo Electrónico"
        />
        {errors.email && <p className="error">Falta email</p>}

        <input
          ref={register({ required: true, minLength: 1 })}
          name="password"
          type="password"
          id="password"
          placeholder="Contraseña"
        />
        {errors.password && <p className="error">Falta contraseña</p>}

        <button type="submit">Regístrate</button>
        {errorMessage ? <p>{errorMessage}</p> : null}
      </form>
    </section>
  );
}
