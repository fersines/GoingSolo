import { useForm } from "react-hook-form";
import { register } from "../http/api";

export default function Register(params) {
  const { handleSubmit, register } = useForm();

  const registerSubmit = async (loginData) => {
    const response = await register(loginData);
    const data = await response.json();
    console.log(response.status, data);
  };

  return (
    <form onSubmit={handleSubmit(registerSubmit)}>
      <label htmlFor="email">email</label>
      <input id="email" name="email" ref={register()} />

      <label htmlFor="password">password</label>
      <input id="password" name="password" type="password" ref={register()} />

      <input type="submit" />
    </form>
  );
}
