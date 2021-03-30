import ListPosts from "../components/ListPosts";
import UserPosts from "../components/UserPosts";
import useAuth from "../shared/hooks/useAuth";

export default function PrivateHome() {
  const { userData } = useAuth();

  if (userData.role === "admin") {
    return (
      <section>
        <h1>Estos son los últimos Links subidos:</h1>
        <ListPosts></ListPosts>
      </section>
    );
  } else {
  }
  return (
    <section>
      <h1>Bienvenido de nuevo! Estos son tus Links:</h1>
      <UserPosts></UserPosts>
    </section>
  );
}
