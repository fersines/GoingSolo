import { useEffect, useState } from "react";
import useAuth from "../shared/hooks/useAuth";

const apiUrl = "https://localhost:3000";

export default function MisLinks() {
  const { userData } = useAuth();
  const [posts, setposts] = useState(null);

  const token = localStorage.getItem("token");

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", token);

  useEffect(() => {
    console.log(userData);
    fetch(`${apiUrl}/users/${userData.id}/posts`, {
      method: "GET",
      headers: headers,
    })
      .then((response) => {
        return response.json();
      })
      .then((profile) => {
        console.log(profile);
        setposts(profile.data);
      });
  }, []);

  return <h1>Aquí saldría el listado con los links del usuario</h1>;
}
