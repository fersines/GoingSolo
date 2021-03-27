import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../pages/hooks/useAuth";
import { useHistory } from "react-router-dom";

const apiUrl = "http://localhost:3000";

export default function EditandoUsuario(data) {
  const history = useHistory();
  const { userData } = useAuth();
  const [profile, setProfile] = useState();
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState();

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

  const onSubmit = async (data) => {
    try {
      const headers = new Headers();
      headers.append("Authorization", token);

      const body = new FormData();
      body.append("email", data.email);
      body.append("name", data.name);

      if (data.avatar.length) {
        body.append("avatar", data.avatar[0]);
      }
      /*  body.append("avatar", data.avatar); */
      const response = await fetch(`${apiUrl}/users/${userData.id}`, {
        method: "PUT",
        headers: headers,
        body: body,
      });
      const json = await response.json();
      if (response.ok) {
        history.push("/usersarea");
      } else {
        throw new Error(json.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  if (!profile) return <p>Cargando...</p>;

  return (
    <section>
      {profile.name ? (
        <h1>{"Nos alegra verte " + profile.name + "!"}</h1>
      ) : (
        <h1>Hola de nuevo!</h1>
      )}
      <h2>Estos son tus datos de perfil</h2>
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email</label>
          <input
            ref={register({ required: false })}
            type="email"
            name="email"
            id="email"
            defaultValue={profile.email}
          />
          <label htmlFor="name">Tu nombre</label>
          <input
            ref={register({ required: false })}
            type="text"
            name="name"
            id="name"
            defaultValue={profile.name}
          />
          <label htmlFor="avatar">Tu avatar</label>
          <input
            ref={register({ required: false })}
            type="file"
            name="avatar"
            id="avatar"
            accept="image/*"
          />

          <button type="submit">Guarda los cambios!</button>
          {errorMessage ? <p>{errorMessage}</p> : null}
        </form>
      </section>
    </section>
  );
}
