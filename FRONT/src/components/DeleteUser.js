import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";

const apiUrl = "http://localhost:3000";

export default function EditUserProfile(data) {
  const { id } = useParams();
  const [profile, setProfile] = useState();
  const { handleSubmit } = useForm();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getProfile = async () => {
      const headers = new Headers();

      headers.append("Content-Type", "application/json");
      headers.append("Authorization", token);
      try {
        const response = await fetch(`${apiUrl}/users/${id}`, {
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
  }, [token, id]);

  const onSubmit = async (data) => {
    try {
      const headers = new Headers();
      headers.append("Authorization", token);

      const response = await fetch(`${apiUrl}/users/${id}`, {
        method: "DELETE",
        headers: headers,
      });
      const json = await response.json();
      if (response.ok) {
        history.push("/findusers");
      } else {
        throw new Error(json.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  if (!profile) return <p>Cargando...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button type="submit">Borrar Usuario</button>
      {errorMessage ? <p>{errorMessage}</p> : null}
    </form>
  );
}
