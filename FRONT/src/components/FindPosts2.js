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

  const [setSearch] = useState(search);

  const headers = new Headers();
  headers.append("Authorization", token);

  useEffect(() => {
    if (search) {
      console.log(search);
    }
  }, [search]);

  const listSearch = async (search) => {
    try {
      const response = await fetch(`${apiUrl}/posts?search=${search}`, {
        method: "GET",
        headers: headers,
        params: (search = { search }),
      });
      const posts = await response.json();

      if (response.ok) {
        console.log(posts);
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
      <form method="GET">
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

        <button onClick={() => listSearch(search)}>Búscalo!</button>
        {errorMessage ? <p>{errorMessage}</p> : null}
      </form>
    </>
  );
}
