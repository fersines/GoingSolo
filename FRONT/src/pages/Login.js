import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import useAuth from "../shared/hooks/useAuth";

export default function Login() {
  const { signIn } = useAuth();

  return (
    <>
      <LoginForm signIn={signIn}></LoginForm>
    </>
  );
}
