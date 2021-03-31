import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

const apiUrl = "http://localhost:3000";

export default function LoveLink(data) {
  const { id } = useParams();
  const { register, handleSubmit, errors } = useForm();
  const [errorMessage, setErrorMessage] = useState();

  const token = localStorage.getItem("token");

  const headers = new Headers();
  if (token) {
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", token);
  }

  const body = new FormData();
  body.append("love", data.love);

  const onSubmit = async (data) => {
    try {
      await fetch(`${apiUrl}/posts/${id}/likes`, {
        headers: headers,
        method: "POST",
        body: JSON.stringify(data),
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button type="submit">LoveIt!</button>
      {errorMessage ? <p>{errorMessage}</p> : null}
    </form>
  );
}
