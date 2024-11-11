// src/HomePage.jsx
import { useEffect, useState } from 'react';
import apiClient from './config/axios';
import { Link } from 'react-router-dom';
import { isAuthenticated } from './utils/auth';

const HomePage = () => {
  const [currentUser, setCurrentUser] = useState({});
  const primaryButtonClass = "btn btn-primary btn-lg px-4 py-2 shadow-sm";
  const secondaryButtonClass = "btn btn-success btn-lg px-4 py-2 shadow-sm";

  useEffect(() => {
    const getUserData = () => {
      apiClient.get("/users/current.json")
        .then(response => {
          console.log(response.data);
          setCurrentUser(response.data);
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
        });
    };

    if (isAuthenticated()) {
      getUserData();
    }
  }, []);

  return (
    <div className="container-fluid bg-light min-vh-100">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12">
          <div className="text-center py-5">
            <img
              src="src/assets/Bigger_Get_in_Shape.png"
              className="img-fluid mb-4 shadow rounded"
              alt="Get in Shape Logo"
              style={{ maxWidth: '400px' }}
            />
            
            <div className="bg-white rounded shadow p-5 mb-4">
              <h1 className="display-4 mb-3 fw-bold text-purple">
                Welcome to Get In Shape
              </h1>
              
              <p className="text-muted mb-4 px-md-5 lead">
                We are here to help you find the exercises you want and save them to routines 
                so all you have to do is GET IN SHAPE!
              </p>
              
              <div className="my-5">
                <h2 className="h3 mb-3 text-primary">
                  Hi {currentUser?.name || 'Fitness Enthusiast'}!
                </h2>
                <p className="lead mb-4">What would you like to do today?</p>
                
                {isAuthenticated() ? (
                  <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center">
                    <Link 
                      to="/Exercises"
                      className={primaryButtonClass}
                    >
                      Browse Exercises
                    </Link>
                    <Link 
                      to="/routines"
                      className={secondaryButtonClass}
                    >
                      All Routines
                    </Link>
                    <Link 
                      to="/routines"
                      className={secondaryButtonClass}
                    >
                      Today's Routine
                    </Link>
                  </div>
                ) : (
                  <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center">
                    <Link 
                      to="/Exercises"
                      className={primaryButtonClass}
                    >
                      Browse Exercises
                    </Link>
                    <Link 
                      to="/login"
                      className={secondaryButtonClass}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/signup"
                      className={secondaryButtonClass}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;