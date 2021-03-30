import LoginForm from "../components/LoginForm";
import NewPassword from "../components/NewPassword";
import ResetPassword from "../components/ResetPassword";
import useAuth from "./hooks/useAuth";

export default function Login() {
  const { signIn } = useAuth();

  return (
    <section>
      <>
        <LoginForm signIn={signIn}></LoginForm>
        <NewPassword></NewPassword>
        <ResetPassword></ResetPassword>
      </>
    </section>
  );
}
