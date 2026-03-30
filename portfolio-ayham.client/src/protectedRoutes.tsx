import { useEffect, useState } from "react";

function ProtectedRoutes() {
  const [isLogged, setIsLogged] = useState(false);

  const API_URL = import.meta.env.ApiUrl;
  useEffect(() => {
    fetch(`${API_URL}signedIn`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then(() => {
        setIsLogged(true);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return isLogged
}

export default ProtectedRoutes;