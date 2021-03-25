import { Redirect } from "react-router";
import useAuth from "../shared/hooks/useAuth";

export default function AdminRoute({ children }) {
  const { userData } = useAuth();

  return (
    <>{userData.role === "admin" ? children : <Redirect to="/"></Redirect>}</>
  );
}
