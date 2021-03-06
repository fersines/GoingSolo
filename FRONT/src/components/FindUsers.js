import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import useQueryString from "../shared/hooks/useQueryString";

const apiUrl = "http://localhost:3000";

export default function FindUsers() {
  const [query, path] = useQueryString();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState();

  const token = localStorage.getItem("token");

  const search = query.get("search");

  const [searchstring, setSearch] = useState(search);

  const [order, setOrder] = useState("email");
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
        `${apiUrl}/users/list?search=${search}&order=${order}&direction=${direction}`,
        {
          method: "GET",
          headers: headers,
          params: (search = { search }),
        }
      );
      const users = await response.json();
      console.log(users);
      setSearchResult(users.data);
      if (response.ok) {
      } else {
        throw new Error(users.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <body className="body-buscador">
        <h1>Buscador de Usuarios</h1>
        <section className="buscador">
          <form onSubmit={(e) => e.preventDefault()} method="GET">
            <fieldset>
              <label>
                <h3>Término de búsqueda</h3>
                <p>(Se puede buscar por el Email del usuario)</p>
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
              const newOrder = order === "email" ? "date" : "email";
              setOrder(newOrder);
              listSearch(search);
            }}
          >
            Cambia el orden!
          </button>
          <ul>
            {searchResult.map((user) => {
              return (
                <li key={user.id}>
                  <article>
                    <header>
                      <Link to={`/user/${user.id}`}>
                        <h4>{user.email}</h4>
                      </Link>
                    </header>
                    <h4>{user.name}</h4>

                    <h5>
                      Fecha de alta:
                      <p>{new Date(user.date).toLocaleString("es-ES")}</p>
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
