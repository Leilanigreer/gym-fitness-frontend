import { Link } from "react-router-dom";
import { LogoutLink } from "./LogoutLink";
import { useEffect, useState } from "react";
import axios from "axios";

export function Header() {
  const [currentUser, setCurrentUser] = useState ({});

  const getUserData = () => {
    axios.get("http://localhost:3000/users/current.json").then(response => {
      console.log(response.data)
      setCurrentUser(response.data)
    })
  };

  useEffect(getUserData, []);

  let authenticationLinks;

  if (localStorage.jwt === undefined) {
    authenticationLinks = (
      <>
      <Link to="/Signup">Signup</Link> | 
      <Link to="/Login">Login</Link>
      </>
    )
  } else {
    authenticationLinks = (
      <LogoutLink />
    )
  };

  return (
    <header>
      <nav>
        <a href="/">Home</a> | {authenticationLinks}
      </nav>
        <h2>Hi {currentUser.name}!</h2>
    </header>
  )
}