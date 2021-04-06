import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";

const apiUrl = "http://localhost:3000";

export default function LoveComment(data) {
  const { id } = useParams();
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState();
  const [comment, setComment] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getComment = async () => {
      const headers = new Headers();

      headers.append("Content-Type", "application/json");
      headers.append("Authorization", token);
      try {
        const response = await fetch(`${apiUrl}/comments/${id}`, {
          method: "GET",
          headers: headers,
        });

        const json = await response.json();

        if (response.ok) {
          setComment(json.data);
        } else {
          throw new Error(json.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getComment();
  }, [token, id]);

  const headers = new Headers();
  if (token) {
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", token);
  }

  const body = new FormData();
  body.append("love", data.love);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${apiUrl}/comments/${comment.id}/likes`, {
        headers: headers,
        method: "POST",
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (response.ok) {
        history.push("/masvotados");
      } else {
        throw new Error(json.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        ref={register({ required: true })}
        type="hidden"
        name="love"
        id="love"
        value="1"
      />
      <button type="submit">LoveIt!</button>
      {errorMessage ? <p>{errorMessage}</p> : null}
    </form>
  );
}
