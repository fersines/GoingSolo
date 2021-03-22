import { useEffect, useState } from "react";
import useAuth from "../shared/hooks/useAuth";

const apiUrl = "http://localhost:3000";

export default function UserForm() {
  const { userData } = useAuth();
  const [profile, setProfile] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getProfile = async () => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", token);

      try {
        const response = await fetch(`${apiUrl}/users/${userData.id}`, {
          method: "GET",
          headers: headers,
        });

        const json = await response.json();

        if (response.ok) {
          setProfile(json.data);
        } else {
          throw new Error(json.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getProfile();
  }, [token, userData.id]);

  if (!profile) return <div>Cargando...</div>;

  return (
    <section>
      <h1>Aquí deberían salir los datos del perfil del usuario</h1>
      <div>{profile.name}</div>
    </section>
  );
}
