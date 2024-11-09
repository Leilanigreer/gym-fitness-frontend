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
      <li className="nav-item d-flex">
        <Link className="nav-link" to="/Signup">Signup</Link>
        <Link className="nav-link" to="/Login">Login</Link>
      </li>
    )
  } else {
    authenticationLinks = (
      <li className="nav-item">
        <LogoutLink />
      </li>
    )
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="src/assets/Bigger_Get_in_Shape.png" alt="Logo" width="50" height="50" className="d-inline-block"/>
            <span className="fs-4 fw-bold ms-2"> G.I.S</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/routines">My Routines</Link>
              </li>
              {authenticationLinks}
            </ul>
          </div>
        </div>
      </nav>
      <h2>Hi {currentUser.name}!</h2>
    </header>
  )
}

