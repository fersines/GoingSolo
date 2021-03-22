import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../shared/context/authContext";

export default function NuevoLink(props) {
  const { newLink } = useContext(AuthContext);
  const { register, handleSubmit, errors } = useForm();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      await newLink(data.link, data.title, data.story);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  console.log(errors);

  return (
    <section className="page">
      <h1>Aquí saldrían el formulario para un nuevo Link</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="url">Link</label>
        <input ref={register({ required: true })} name="link" id="link" />
        {errors.link && <p className="error">Falta el LINK</p>}
        <label htmlFor="title">Título para tu Link</label>
        <input
          ref={register({ required: true, minLength: 1 })}
          name="title"
          type="title"
          id="title"
        />
        {errors.title && <p className="error">Falta el título</p>}
        <label htmlFor="story">Cuéntanos sobre tu Link</label>
        <input
          ref={register({ required: true, minLength: 1 })}
          name="story"
          type="story"
          id="story"
        />
        {errors.title && <p className="error">Falta la story</p>}
        <label htmlFor="button">¿Todo correcto?</label>
        <button type="submit">Link it UP!</button>
      </form>
    </section>
  );
}
