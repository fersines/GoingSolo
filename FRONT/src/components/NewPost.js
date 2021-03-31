import { useState } from "react";
import { useForm } from "react-hook-form";

const apiUrl = "http://localhost:3000";

export default function NewPost(data) {
  const { register, handleSubmit, errors } = useForm();
  const [errorMessage, setErrorMessage] = useState();

  const token = localStorage.getItem("token");

  const headers = new Headers();
  if (token) {
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", token);
  }

  const body = new FormData();
  body.append("link", data.link);
  body.append("title", data.title);
  body.append("story", data.story);

  const onSubmit = async (data) => {
    try {
      await fetch(`${apiUrl}/posts`, {
        headers: headers,
        method: "POST",
        body: JSON.stringify(data),
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <section className="page">
      <h1>Sube aquí tu nuevo Link!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="url">Linkito</label>
        <input ref={register({ required: true })} name="link" id="link" />
        {errors.link && <p className="error">Falta el Link</p>}
        <label htmlFor="title">Ponle un título</label>
        <input
          ref={register({ required: true, minLength: 1 })}
          name="title"
          type="title"
          id="title"
        />
        {errors.title && <p className="error">El título es obligatorio</p>}
        <label htmlFor="story">Cuéntanos algo sobre tu Link</label>
        <textarea
          ref={register({ required: true, minLength: 1 })}
          name="story"
          type="story"
          id="story"
        />
        {errors.title && <p className="error">Necesitas un comentario</p>}

        <button type="submit">LinkItUP!</button>
        {errorMessage ? <p>{errorMessage}</p> : null}
      </form>
    </section>
  );
}
