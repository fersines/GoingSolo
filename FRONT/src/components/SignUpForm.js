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
    <>
      <body className="body-register">
        <section className="register">
          <h2>Alístate en Link It UP!</h2>

          <b>
            ¿Quieres ser parte de la comunidad de LinkItUP!? Aquí tienes tu
            "Speakers' Corner" virtual.
          </b>
          <ul>
            <li>
              <p>¿Quieres que todos nos enteremos de eso con lo que flipas?</p>
            </li>
            <li>
              <p>¿Quieres que el mundo sepa eso que aborreces?</p>
            </li>
            <li>
              <p>¿O quieres saber lo que a los demás nos flipa o aborrece?</p>
            </li>
          </ul>
          <p>Sea por el motivo que sea, aquí encontrarás tu sitio.</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
              <input
                ref={register({ required: true })}
                name="email"
                id="email"
                placeholder="Correo Electrónico"
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
              />
              {errors.password && <p className="error">Falta contraseña</p>}
            </fieldset>

            <button type="submit">Regístrate</button>
            {errorMessage ? <p>{errorMessage}</p> : null}
          </form>
        </section>
      </body>
    </>
  );
}
