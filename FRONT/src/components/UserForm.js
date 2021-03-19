import useAuth from "../shared/hooks/useAuth";

export default function UserForm(props) {
  const { userData } = useAuth();

  return userData.role;
}
