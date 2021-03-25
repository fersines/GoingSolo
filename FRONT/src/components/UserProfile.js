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

  return (
    <section>
      <h1>{"Nos alegra verte " + profile.name + "!"}</h1>
      <h2>Estos son tus datos de perfil</h2>
      <section>
        <form onSubmit="">
          <label htmlFor="email">Email</label>
          <p>{profile.email}</p>
          <label htmlFor="name">Tu nombre</label>
          {profile.name ? (
            <p>{profile.name}</p>
          ) : (
            <p>Todavía no tenemos tu nombre</p>
          )}
          <label htmlFor="avatar">Avatar</label>
          {profile.avatar ? (
            <img className="avatar" alt="avatar" src={profile.avatar} />
          ) : (
            <p>No tienes avatar</p>
          )}
          <Link to="/edituser">Edita tu usuario</Link>
          <Link to="/editpassword">Cambia tu contraseña</Link>
        </form>
      </section>
    </section>
  );
}
