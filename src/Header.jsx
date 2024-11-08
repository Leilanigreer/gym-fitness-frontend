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
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
          {/* <img src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="Logo" width="30" height="24" class="d-inline-block align-text-top"> */}
            G.I.S
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/routines">My Routines</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active"> {authenticationLinks}</a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
      {/* <nav>
        <a href="/">Home</a> | {authenticationLinks}
      </nav> */}
        <h2>Hi {currentUser.name}!</h2>
    </header>
  )
}

