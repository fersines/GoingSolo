import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";

const apiUrl = "http://localhost:3000";

export default function DeleteLink(data) {
  const { id } = useParams();
  const history = useHistory();
  const [post, setPost] = useState([]);
  const { handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getPost = async () => {
      const headers = new Headers();

      headers.append("Content-Type", "application/json");
      headers.append("Authorization", token);
      try {
        const response = await fetch(`${apiUrl}/posts/${id}`, {
          method: "GET",
          headers: headers,
        });

        const json = await response.json();

        if (response.ok) {
          setPost(json.data);
        } else {
          throw new Error(json.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getPost();
  }, [token, id]);

  const onSubmit = async (data) => {
    try {
      const headers = new Headers();
      headers.append("Authorization", token);

      const response = await fetch(`${apiUrl}/posts/${id}`, {
        method: "DELETE",
        headers: headers,
      });
      const json = await response.json();
      if (response.ok) {
        history.push("/mislinks");
      } else {
        throw new Error(json.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  if (!post) return <p>Buscando Link...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button type="submit">Eliminar Link</button>
      {errorMessage ? <p>{errorMessage}</p> : null}
    </form>
  );
}
