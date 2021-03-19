import useAuth from "../shared/hooks/useAuth";

export default function AdminComponent({ children }) {
  const { userData } = useAuth();
  console.log(userData);
  return <>{userData.role === "admin" ? children : null}</>;
}
