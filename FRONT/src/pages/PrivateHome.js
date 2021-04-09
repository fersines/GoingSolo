import ListPosts from "../components/ListPosts";
import UserPosts from "../components/UserPosts";
import useAuth from "../shared/hooks/useAuth";

export default function PrivateHome() {
  const { userData } = useAuth();

  if (userData.role === "admin") {
    return (
      <>
        <ListPosts></ListPosts>
      </>
    );
  } else {
  }
  return (
    <>
      <UserPosts></UserPosts>
    </>
  );
}
