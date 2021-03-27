import SignUpForm from "../components/SignUpForm";
import useAuth from "./hooks/useAuth";

export default function SignUpApi() {
  const { signUp } = useAuth();

  return (
    <>
      <SignUpForm signUp={signUp}></SignUpForm>
    </>
  );
}
