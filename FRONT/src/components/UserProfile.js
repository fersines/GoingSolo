import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../shared/hooks/useAuth";

const apiUrl = "http://localhost:3000";

export default function UserProfile() {
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

  if (!profile)
    return (
      <div>
        Puede que estemos yendo un poco lentos hoy..., o también puede que hayas
        realizado un cambio en tu perfil y no lo hayas validado todavía!
      </div>
    );
  console.log(profile);

  return (
    <section className="userprofile">
      <h1>{"Bienvenido de nuevo " + profile.name + "!"}</h1>
      <h3>Estos son tus datos de perfil</h3>

      <h4>Email</h4>
      <p>{profile.email}</p>
      <h4>Tu nombre</h4>
      {profile.name ? (
        <p>{profile.name}</p>
      ) : (
        <p>Todavía no tenemos tu nombre</p>
      )}
      <div>
        <h4>Avatar</h4>
        {profile.avatar ? (
          <img
            className="avatar"
            alt="avatar"
            src={`${apiUrl}/uploads/${profile.avatar}`}
          />
        ) : (
          <p>No tienes avatar</p>
        )}
      </div>

      <Link to="/edituser">Edita tu usuario</Link>

      <Link to="/editpassword">Cambia tu contraseña</Link>
    </section>
  );
}
