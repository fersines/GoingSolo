import { useEffect } from "react";
import useAuth from "../shared/hooks/useAuth";

const apiUrl = "https://localhost:3000";

export default function UserForm() {
  const { userData } = useAuth();

  const token = localStorage.getItem("token");

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", token);

  useEffect(() => {
    console.log(userData);
    fetch(`${apiUrl}/users/${userData.id}`, { method: "GET", headers: headers })
      .then((response) => {
        return response.json();
      })
      .then((profile) => {
        console.log(profile);
      });
  }, []);

  return <h1>Aquí deberían salir los datos del perfil del usuario</h1>;
}
