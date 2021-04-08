import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import useAuth from "../shared/hooks/useAuth";

const apiUrl = "http://localhost:3000";

export default function EditUserProfile(data) {
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
        <h2>{"Nos alegra verte " + profile.name + "!"}</h2>
      ) : (
        <h2>Hola de nuevo!</h2>
      )}
      <h4>Estos son tus datos de perfil</h4>

      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <h5>
            <label htmlFor="email">Email</label>
          </h5>

          <input
            ref={register({ required: false })}
            type="email"
            name="email"
            id="email"
            defaultValue={profile.email}
          />
        </fieldset>
        <fieldset>
          <h5>
            <label htmlFor="name">Nombre</label>
          </h5>

          <input
            ref={register({ required: false })}
            type="text"
            name="name"
            id="name"
            defaultValue={profile.name}
          />
        </fieldset>
        <fieldset>
          <h5>
            <label htmlFor="avatar">Tu avatar</label>
          </h5>

          <input
            ref={register({ required: false })}
            type="file"
            name="avatar"
            id="avatar"
            accept="image/*"
          />
        </fieldset>

        <button type="submit">Guarda los cambios!</button>
        {errorMessage ? <p>{errorMessage}</p> : null}
      </form>
    </section>
  );
}
