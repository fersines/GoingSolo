import LoginForm from "../components/LoginForm";
import NewPassword from "../components/NewPassword";
import ResetPassword from "../components/ResetPassword";
import useAuth from "../shared/hooks/useAuth";

export default function Login() {
  const { signIn } = useAuth();

  return (
    <>
      <LoginForm signIn={signIn}></LoginForm>
      <NewPassword></NewPassword>
      <ResetPassword></ResetPassword>
    </>
  );
}
