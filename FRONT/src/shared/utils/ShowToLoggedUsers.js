import useAuth from "../shared/hooks/useAuth";

export default function ShowToLoggedUsers({ children }) {
  const { isUserLogged } = useAuth();

  return <>{isUserLogged ? children : null}</>;
}
