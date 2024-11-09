import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import axios from "axios";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ExercisesIndex } from "./ExercisesIndex";
import { LoginPage } from "./LoginPage";
import { SignupPage } from "./SignupPage";
import  RoutinesIndex  from "./RoutinesIndex";
import  HomePage from "./HomePage";

const router = createBrowserRouter([
  {
    element: (
      <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#F1EDE6' }}>
        <Header />
        <main className="flex-grow-1">
          <div className="container py-4">
            <div className="bg-white p-4 rounded shadow-sm">
              <Outlet />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/Exercises",
        element: <ExercisesIndex />,
        loader: () => axios.get("http://localhost:3000/exercises.json").then((response) => response.data),
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/routines",
        element: <RoutinesIndex />,
        loader: () => axios.get("http://localhost:3000/routines.json").then((response) => response.data),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;