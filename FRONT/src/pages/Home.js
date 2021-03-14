import useAuth from "../shared/hooks/useAuth";

export default function Home() {
  const { testData, userData, isLogged } = useAuth();

  return (
    <section>
      <h1>HOME claro!</h1>
      {userData?.role}
      {isLogged}
      {testData.map((item) => {
        return <p key="item">{item}</p>;
      })}
    </section>
  );
}
