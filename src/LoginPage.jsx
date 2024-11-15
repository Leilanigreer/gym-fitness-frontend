import apiClient from "./config/axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const jwt = localStorage.getItem("jwt");
if (jwt) {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export function LoginPage() {
  const [errors, setErrors] = useState([]);
  const location = useLocation ();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if(location.state?.message) {
      setMessage(location.state.message);
      const timer = setTimeout(()=> {
        setMessage("");
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [location]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    apiClient
      .post("/sessions.json", params)
      .then((response) => {
        apiClient.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        event.target.reset();
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error.response);
        setErrors(["Invalid email or password"]);
      });
  };

  return (
    <div id="login">
      {message && (
        <div className="alert alert-success" role="alert" >{message}</div>
      )}
      <h1>Login</h1>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          Email: <input name="email" type="email" />
        </div>
        <div>
          Password: <input name="password" type="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}