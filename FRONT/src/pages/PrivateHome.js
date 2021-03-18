import useAuth from "../shared/hooks/useAuth";

export default function PrivateHome() {
  const { userData } = useAuth();

  if (userData.role === "admin") {
    <h1>Esta es la Home del Admin logado</h1>;
  } else {
  }
  return (
    <section>
      <h1>Esta es la Home de un usuario logado con role === "normal"</h1>
    </section>
  );
}
