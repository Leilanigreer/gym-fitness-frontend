import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function HomePage() {
  const [currentUser, setCurrentUser] = useState({});

  const getUserData = () => {
    axios.get("http://localhost:3000/users/current.json").then(response => {
      console.log(response.data);
      setCurrentUser(response.data);
    });
  };

  useEffect(getUserData, []);

  return (
    <div className="container-fluid min-h-screen bg-light">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12">
          <div className="text-center py-5">
            <img
              src="src/assets/Bigger_Get_in_Shape.png"
              className="img-fluid mb-4 shadow-lg rounded"
              alt="Get in Shape Logo"
              style={{ maxWidth: '400px' }}
            />
            
            <div className="bg-white rounded-lg shadow-lg p-5 mb-4">
              <h1 className="display-4 mb-3 text-purple-800 fw-bold">Welcome to Get In Shape</h1>
              <h5 className="text-muted mb-4 px-md-5">
                We are here to help you find the exercises you want and save them to routines 
                so all you have to do is GET IN SHAPE!
              </h5>
              
              <div className="my-5">
                <h2 className="h3 mb-3 text-primary">
                  Hi {currentUser.name || 'Fitness Enthusiast'}!
                </h2>
                <p className="lead mb-4">What would you like to do today?</p>
                
                <div className="d-flex gap-3 justify-content-center">
                  <Link 
                    role="button" 
                    className="btn btn-primary btn-lg px-4 py-2 shadow-sm"
                    to="/placeholder"
                  >
                    Browse Exercises
                  </Link>
                  <Link 
                    role="button" 
                    className="btn btn-success btn-lg px-4 py-2 shadow-sm"
                    to="/routines"
                  >
                    Check My Routine
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;