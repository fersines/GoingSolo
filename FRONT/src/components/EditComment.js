import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import useAuth from "../shared/hooks/useAuth";
import CommentDetails from "./CommentDetails";

const apiUrl = "http://localhost:3000";

export default function EditComment(data) {
  const history = useHistory();
  const { userData } = useAuth();
  const { id } = useParams();
  const [comment, setComment] = useState([]);
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState();

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

  const onSubmit = async (data) => {
    try {
      const headers = new Headers();
      headers.append("Authorization", token);

      const body = new FormData();
      body.append("comment", data.comment);

      const response = await fetch(`${apiUrl}/comments/${comment.id}`, {
        method: "PUT",
        headers: headers,
        body: body,
      });
      const json = await response.json();
      if (response.ok) {
        history.push("/loggeduser");
      } else {
        throw new Error(json.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  if (userData.role === "admin" || userData.id === comment.comment_user_id) {
    return (
      <>
        <body className="body-editcomment">
          <section className="editcomment">
            <h2>Este es el Comentario a editar</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset>
                <h4>
                  <label htmlFor="comment">Comentario</label>
                </h4>

                <textarea
                  ref={register({ required: false })}
                  type="text"
                  name="comment"
                  id="comment"
                  defaultValue={comment.comment}
                />
              </fieldset>

              <button type="submit">Guarda los cambios!</button>
              {errorMessage ? <p>{errorMessage}</p> : null}
            </form>
          </section>
        </body>
      </>
    );
  } else {
    return (
      <section>
        <CommentDetails></CommentDetails>
      </section>
    );
  }
}
