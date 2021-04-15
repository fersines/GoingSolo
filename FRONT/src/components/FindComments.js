import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import useQueryString from "../shared/hooks/useQueryString";

const apiUrl = "http://localhost:3000";

export default function FindComments() {
  const [query, path] = useQueryString();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState();

  const token = localStorage.getItem("token");

  const search = query.get("search");

  const [searchstring, setSearch] = useState(search);

  const [order, setOrder] = useState("loves");
  const [direction, setDirection] = useState("DESC");

  const headers = new Headers();
  headers.append("Authorization", token);

  useEffect(() => {
    if (search) {
      console.log(search);
    }
  }, [search]);

  const [searchResult, setSearchResult] = useState([]);

  const listSearch = async (search) => {
    try {
      const response = await fetch(
        `${apiUrl}/comments?search=${search}&order=${order}&direction=${direction}`,
        {
          method: "GET",
          headers: headers,
          params: (search = { search }),
        }
      );
      const comments = await response.json();
      console.log(comments);
      setSearchResult(comments.data);
      if (response.ok) {
      } else {
        throw new Error(comments.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <body className="body-buscador">
        <h1>Buscador de Comentarios</h1>
        <section className="buscador">
          <form onSubmit={(e) => e.preventDefault()} method="GET">
            <fieldset>
              <label>
                <h3>Término de búsqueda</h3>
                <p>(Busca por el texto del comentario)</p>
              </label>
              <input
                type="search"
                name="search"
                value={search}
                onChange={(e) => {
                  const newsearch = e.target.value;
                  query.set("search", newsearch);
                  history.push(`${path}?${query.toString()}`);
                  setSearch(newsearch);
                }}
              />
            </fieldset>

            <button onClick={() => listSearch(search)}>Búscalo!</button>
            {errorMessage ? <p>{errorMessage}</p> : null}
          </form>

          <h2>Resultado de la búsqueda</h2>
          <button
            onClick={() => {
              const newOrder = order === "loves" ? "comment_date" : "loves";
              setOrder(newOrder);
              listSearch(search);
            }}
          >
            Cambia el orden!
          </button>
          <ul>
            {searchResult.map((comment) => {
              return (
                <li key={comment.id}>
                  <article>
                    <header>
                      <Link to={`/comment/${comment.id}`}>
                        <h3>
                          Publicado el:{" "}
                          {new Date(comment.comment_date).toLocaleString(
                            "es-ES"
                          )}
                        </h3>{" "}
                      </Link>
                    </header>
                    <h4>{comment.comment}</h4>
                  </article>
                </li>
              );
            })}
          </ul>
        </section>
      </body>
    </>
  );
}
