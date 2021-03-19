import UserForm from "../components/UserForm";
import useAuth from "../shared/hooks/useAuth";

export default function UserInfo() {
  const { getUser } = useAuth();

  return (
    <>
      <UserForm getUser={getUser}></UserForm>
    </>
  );
}
