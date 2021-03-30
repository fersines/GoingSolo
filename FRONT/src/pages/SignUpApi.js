import SignUpForm from "../components/SignUpForm";
import useAuth from "../shared/hooks/useAuth";

export default function SignUpApi() {
  const { signUp } = useAuth();

  return (
    <section>
      <>
        <SignUpForm signUp={signUp}></SignUpForm>
      </>
    </section>
  );
}
