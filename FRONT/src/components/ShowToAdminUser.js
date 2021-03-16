import useAuth from "../shared/hooks/useAuth";

export default function ShowToAdminUser({ children }) {
  const { userData } = useAuth();

  return <>{userData?.role === "admin" ? children : null}</>;
}
