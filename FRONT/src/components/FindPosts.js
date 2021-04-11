import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import useQueryString from "../shared/hooks/useQueryString";

const apiUrl = "http://localhost:3000";

export default function FindPosts() {
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
        `${apiUrl}/posts?search=${search}&order=${order}&direction=${direction}`,
        {
          method: "GET",
          headers: headers,
          params: (search = { search }),
        }
      );
      const posts = await response.json();
      console.log(posts);
      setSearchResult(posts.data);
      if (response.ok) {
      } else {
        throw new Error(posts.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <body className="body-buscador">
        <section className="buscador">
          <h1>Buscador de Links</h1>
          <form onSubmit={(e) => e.preventDefault()} method="GET">
            <fieldset>
              <label>
                <h3>Término de búsqueda</h3>
                <p>(Se puede buscar por Título, Story o Id del autor)</p>
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

          <h1>Resultado de la búsqueda</h1>
          <button
            onClick={() => {
              const newOrder = order === "loves" ? "date" : "loves";
              setOrder(newOrder);
              listSearch(search);
            }}
          >
            Cambia el orden!
          </button>

          {/* <select id="order">
    <option
      value={() => {
        const newOrder = "loves";
        setOrder(newOrder);
      }}
      onClick={() => {
        listSearch(search);
      }}
    >
      Más votados
    </option>
    <option
      value={() => {
        const newOrder = "date";
        setOrder(newOrder);
      }}
      onClick={() => {
        listSearch(search);
      }}
    >
      Más recientes
    </option>
    <option
      value={() => {
        const newDirection = "DESC";
        setOrder(newDirection);
        listSearch(search);
      }}
    >
      Menos votados
    </option>
    <option
      value={() => {
        const newDirection = "ASC";
        setOrder(newDirection);
        listSearch(search);
      }}
    >
      Más antiguos
    </option>
  </select> */}

          {/* <button
    onClick={() => {
      const newDirection = direction === "DESC" ? "ASC" : "DESC";
      setDirection(newDirection);
      listSearch(search);
    }}
  >
    {direction}
  </button>
*/}
          <ul>
            {searchResult.map((post) => {
              return (
                <li key={post.id}>
                  <article>
                    <header>
                      <Link to={`/link/${post.id}`}>
                        <h3>{post.link}</h3>{" "}
                      </Link>
                    </header>
                    <h4>{post.title}</h4>

                    <h5>
                      Fecha de alta:
                      <p>{new Date(post.date).toLocaleString("es-ES")}</p>
                    </h5>
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
