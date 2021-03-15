import useAuth from "../shared/hooks/useAuth";
import { useEffect, useState } from "react";

export default function Home() {
  const { testData, userData, isLogged } = useAuth();

  console.log(isLogged);

  return (
    <section>
      <h1>HOME de Link It UP!</h1>
      {userData?.role}
      {isLogged}
      {testData.map((item) => {
        return <p key="item">{item}</p>;
      })}
    </section>
  );
}
