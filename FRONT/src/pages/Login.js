import { useForm } from "react-hook-form";

const apiLip = "http://localhost:3000";

export default function Login() {
  const { handleSubmit, register } = useForm();

  const loginSubmit = async (loginData) => {
    const headers = new Headers({ "Content-Type": "application/json" });
    const response = await fetch(`${apiLip}/users/login`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(loginData),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(loginSubmit)}>
      <label htmlFor="email">email</label>
      <input id="email" name="email" ref={register()} />

      <label htmlFor="password">password</label>
      <input id="password" name="password" type="password" ref={register()} />

      <input type="submit" />
    </form>
  );
}
