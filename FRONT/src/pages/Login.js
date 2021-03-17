import AuthForm from "../components/AuthForm";
import useAuth from "../shared/hooks/useAuth";

export default function Login() {
  const { signIn } = useAuth();

  return (
    <>
      <AuthForm signIn={signIn}></AuthForm>
    </>
  );
}
