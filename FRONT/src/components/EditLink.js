import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import useAuth from "../shared/hooks/useAuth";
import LoveLink from "./LoveLink";

const apiUrl = "http://localhost:3000";

export default function EditLink(data) {
  const history = useHistory();
  const { userData } = useAuth();
  const { id } = useParams();
  const [post, setPost] = useState([]);
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

      const body = new FormData();
      body.append("link", data.link);
      body.append("title", data.title);

      if (data.story.length) {
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

  if (userData.role === "admin" || userData.id === post.post_user_id) {
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
  } else {
    return (
      <section>
        <h1>Detalles del Link con id: {id}</h1>
        <h3>Link</h3>
        <p>{post.link}</p>
        <h3>Fue publicado:</h3>
        <p>{post.date}</p>
        <h3>Título</h3>
        <p>{post.title}</p>
        <h3>Story</h3>
        <p>{post.story}</p>
        <div>
          <button>
            <LoveLink></LoveLink>
          </button>
        </div>
      </section>
    );
  }
}
