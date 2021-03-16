import { Redirect } from "react-router";
import useAuth from "../shared/hooks/useAuth";

export default function PrivateRoute({ children }) {
  const { isUserLogged } = useAuth();
  return <>{isUserLogged ? children : <Redirect to="/login"></Redirect>}</>;
}
