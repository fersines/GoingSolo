import { useForm } from "react-hook-form";

export default function LoginForm({ signIn }) {
  const { handleSubmit, register } = useForm();

  const onSubmit = ({ email, password }) => {
    signIn(email, password);
  };

  return (
    <section className="page">
      <h1>Cacaculopedopis</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email:</label>
        <input ref={register({ required: true })} name="email" />
        <label htmlFor="password">Tu contraseña:</label>
        <input
          ref={register({ required: true })}
          name="password"
          type="password"
        />
        <label htmlFor="button">Vamos!</label>
        <button type="submit">Entra</button>
      </form>
    </section>
  );
}
