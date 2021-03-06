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
    <>
      <body className="body-newlink">
        <h1>Sube aquí tu nuevo Link!</h1>
        <section className="newlink">
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
              <h3>
                <label htmlFor="url">URL del Link</label>
              </h3>
              <p>(Recuerda que empieza por http...)</p>

              <input ref={register({ required: true })} name="link" id="link" />
              {errors.link && <p className="error">Falta el Link</p>}
            </fieldset>
            <fieldset>
              <h3>
                <label htmlFor="title">Ponle un título</label>
              </h3>

              <input
                ref={register({ required: true, minLength: 1 })}
                name="title"
                type="title"
                id="title"
              />
              {errors.title && (
                <p className="error">El título es obligatorio</p>
              )}
            </fieldset>
            <fieldset>
              {" "}
              <h3>
                <label htmlFor="story">Cuéntanos algo sobre tu Link</label>
              </h3>
              <textarea
                ref={register({ required: true, minLength: 1 })}
                name="story"
                type="story"
                id="story"
              />
              {errors.title && (
                <p className="error">Necesitas incluir un comentario</p>
              )}
            </fieldset>

            <button type="submit">LinkItUP!</button>
            {errorMessage ? <p>{errorMessage}</p> : null}
          </form>
        </section>
      </body>
    </>
  );
}
