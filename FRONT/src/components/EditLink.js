import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";

const apiUrl = "http://localhost:3000";

export default function EditLink(data) {
  const history = useHistory();
  const { id } = useParams();
  console.log(id);
  const [post, setPost] = useState();
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getPost = async () => {
      const headers = new Headers();

      headers.append("Content-Type", "application/json");
      headers.append("Authorization", token);
      try {
        const response = await fetch(`${apiUrl}/posts/${id}`, {
          method: "PUT",
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
  console.log(post.id);
  console.log(id);
  const onSubmit = async (data) => {
    try {
      const headers = new Headers();
      headers.append("Authorization", token);

      const body = new FormData();
      body.append("link", data.link);
      body.append("title", data.title);

      if (data.stoyr.length) {
        body.append("story", data.story);
      }

      const response = await fetch(`${apiUrl}/posts/${post.id}`, {
        method: "PUT",
        headers: headers,
        body: body,
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

  if (!post) return <p>Cargando...</p>;

  return (
    <section>
      <h2>Este es el detalle del Link a editar</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="link">Link</label>
        <input
          ref={register({ required: false })}
          type="text"
          name="link"
          id="link"
          defaultValue={post.link}
        />
        <label htmlFor="title">Título</label>
        <input
          ref={register({ required: false })}
          type="text"
          name="title"
          id="title"
          defaultValue={post.title}
        />
        <label htmlFor="avatar">Story</label>
        <input
          ref={register({ required: false })}
          type="text"
          name="story"
          id="story"
          defaultValue={post.story}
        />

        <button type="submit">Guarda los cambios!</button>
        {errorMessage ? <p>{errorMessage}</p> : null}
      </form>
    </section>
  );
}
