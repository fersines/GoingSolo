import LoginForm from "../components/LoginForm";
import useAuth from "./hooks/useAuth";

export default function Login() {
  const { signIn } = useAuth();

  return (
    <section>
      <>
        <LoginForm signIn={signIn}></LoginForm>
      </>
    </section>
  );
}
