import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../shared/context/authContext";

export default function EditUserForm(props) {
  const { editUser } = useContext(AuthContext);
  const { register, handleSubmit, errors } = useForm();
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
    try {
      await editUser(data.email, data.name, data.avatar);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <section>
      <h1>Estos son los datos que se pueden editar</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input
          ref={register({ required: false })}
          name="email"
          type="email"
          id="email"
        />
        <label htmlFor="name">Tu nombre</label>
        <input
          ref={register({ required: false, minLength: 1 })}
          name="name"
          type="text"
          id="name"
        />
        <label htmlFor="avatar">Avatar</label>
        <input
          ref={register({ required: false })}
          name="avatar"
          type="file"
          id="avatar"
        />
        <label htmlFor="button">Cuando lo tengas</label>
        <button type="submit">Guarda tus cambios!</button>
        {errorMessage ? <p>{errorMessage}</p> : null}
      </form>
    </section>
  );
}
