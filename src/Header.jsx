import { Link } from "react-router-dom";
import { LogoutLink } from "./LogoutLink";
import { isAuthenticated } from "./utils/auth";


export function Header() {
  let authenticationLinks;

  if (!isAuthenticated()) {
    authenticationLinks = (
      <li className="nav-item d-flex">
        <Link className="nav-link btn btn-outline-light mx-1 px-3" to="/Signup">Signup</Link>
        <Link className="nav-link btn btn-light mx-1 px-3" to="/Login">Login</Link>
      </li>
    );
  } else {
    authenticationLinks = (
      <li className="nav-item">
        <LogoutLink className="nav-link btn btn-outline-light px-3" />
      </li>
    );
  }

  return (
    <header className="shadow-sm sticky-top">
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#2D0A31' }}>
        <div className="container">
          <Link 
            className="navbar-brand d-flex align-items-center" 
            to="/"
          >
            <img 
              src="src/assets/Bigger_Get_in_Shape.png" 
              alt="Logo" 
              width="50" 
              height="50" 
              className="d-inline-block rounded"
            />
            <span className="fs-4 fw-bold ms-2 text-white">G.I.S</span>
          </Link>
          
          <button 
            className="navbar-toggler border-0" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link 
                  className="nav-link text-white hover:text-opacity-75 px-3 mx-1" 
                  aria-current="page" 
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className="nav-link text-white hover:text-opacity-75 px-3 mx-1" 
                  to="/placeholder"
                >
                  Exercises
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className="nav-link text-white hover:text-opacity-75 px-3 mx-1" 
                  to="/routines"
                >
                  My Routines
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              {authenticationLinks}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}