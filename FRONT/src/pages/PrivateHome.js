import useAuth from "../shared/hooks/useAuth";

export default function PrivateHome() {
  const { userData } = useAuth();
  console.log(userData);

  if (userData.role === "admin") {
    return (
      <section>
        <h1>Esta es la Home del Admin</h1>
      </section>
    );
  } else {
  }
  return (
    <section>
      <h1>Esta es la Home de un usuario logado con role === "normal"</h1>
    </section>
  );
}
