import useAuth from "../shared/hooks/useAuth";

export default function PrivateComponent({ children }) {
  const { isUserLogged } = useAuth();

  return <>{isUserLogged ? children : null}</>;
}
