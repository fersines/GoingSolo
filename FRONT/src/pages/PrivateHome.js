import ListPosts from "../components/ListPosts";
import UserPosts from "../components/UserPosts";
import useAuth from "./hooks/useAuth";

export default function PrivateHome() {
  const { userData } = useAuth();

  if (userData.role === "admin") {
    return (
      <section>
        <h1>Esta es la Home del Admin</h1>
        <ListPosts></ListPosts>
      </section>
    );
  } else {
  }
  return (
    <section>
      <h1>Esta es la Home de un usuario logado con role === "normal"</h1>
      <UserPosts></UserPosts>
    </section>
  );
}
