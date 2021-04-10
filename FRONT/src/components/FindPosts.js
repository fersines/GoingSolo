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
      <h1>Listado de posts filtrados por {search}</h1>
      <form onSubmit={(e) => e.preventDefault()} method="GET">
        <fieldset>
          <input
            type="search"
            name="search"
            style={{ border: "1px solid red" }}
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
        {order}
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
              <Link to={`/link/${post.id}`}>
                <p>{post.link}</p>{" "}
                <p>{new Date(post.date).toLocaleString("es-ES")}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
