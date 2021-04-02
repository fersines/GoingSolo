import ListPosts from "../components/ListPosts";
import UserPosts from "../components/UserPosts";
import useAuth from "../shared/hooks/useAuth";

export default function PrivateHome() {
  const { userData } = useAuth();

  if (userData.role === "admin") {
    return (
      <>
        <h1>Últimos Links subidos:</h1>
        <ListPosts></ListPosts>
      </>
    );
  } else {
  }
  return (
    <>
      <h1>Bienvenido de nuevo! Estos son tus Links:</h1>
      <UserPosts></UserPosts>
    </>
  );
}
