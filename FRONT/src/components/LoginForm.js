import { useForm } from "react-hook-form";

export default function LoginForm() {
  const { handleSubmit, register } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <section className="page">
      <h1>Inicia tu sesión</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email:</label>
        <input ref={register} name="email" />
        <label htmlFor="password">Tu contraseña:</label>
        <input ref={register} name="password" type="password" />
        <label htmlFor="button">Vamos!</label>
        <input name="button" type="submit" />
      </form>
    </section>
  );
}
