import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import axios from "axios";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PlaceholderPage } from "./PlaceholderPage";
import { LoginPage } from "./LoginPage";
import { SignupPage } from "./SignupPage";
import { RoutinesIndex } from "./RoutinesIndex";


const router = createBrowserRouter([
  {
    element: (
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    ),
    children: [
      {
        path: "/",
        element: <PlaceholderPage />,
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