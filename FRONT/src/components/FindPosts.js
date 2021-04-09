import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useQueryString from "../shared/hooks/useQueryString";

export default function FindPosts() {
  const [query, path] = useQueryString();
  const history = useHistory();

  const searchTitle = query.get("title");

  const [title, setTitle] = useState(searchTitle);

  useEffect(() => {
    if (title) {
      console.log(title);
    }
  }, [title]);

  return (
    <>
      <h1>Listado de posts filtrados por {title}</h1>
      <form method="GET">
        <fieldset>
          <input
            type="search"
            name="title"
            style={{ border: "1px solid red" }}
            value={title}
            onChange={(e) => {
              const newTitle = e.target.value;
              query.set("title", newTitle);
              history.push(`${path}?${query.toString()}`);
              setTitle(newTitle);
            }}
          />
        </fieldset>
      </form>
    </>
  );
}
