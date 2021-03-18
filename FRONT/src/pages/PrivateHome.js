import useAuth from "../shared/hooks/useAuth";

export default function PrivateHome() {
  const { userData } = useAuth();
  return (
    <section>
      <h1>Esta es la Home de un usuario logado</h1>
      <>{userData.role === "admin" ? "Otra Movida sólo para el Admin" : null}</>
    </section>
  );
}
