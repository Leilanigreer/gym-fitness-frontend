import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import apiClient from "./config/axios";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ExercisesIndex } from "./ExercisesIndex";
import { LoginPage } from "./LoginPage";
import { SignupPage } from "./SignupPage";
import  RoutinesIndex  from "./RoutinesIndex";
import  HomePage from "./HomePage";
// import { WorkoutLogNew } from "./WorkoutLogNew";
import { WorkoutLog } from "./WorkoutLog";

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
        loader: () => apiClient.get("/exercises.json").then((response) => response.data),
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
        loader: () => apiClient.get("/routines.json").then((response) => response.data),
      },
      {
        path: "/workout_log",
        element: <WorkoutLog />,
        loader: () => apiClient.get("/workout_logs.json").then((response) => response.data),
      },
      // {
      //   path: "/workout_log",
      //   element: <WorkoutLogNew />,
      //   loader: async () => {
      //     // Load both routines and workout logs
      //     const [routinesResponse, logsResponse] = await Promise.all([
      //       apiClient.get("/routines.json"),
      //       apiClient.get("/workout_logs.json")
      //     ]);
          
      //     return {
      //       routines: routinesResponse.data,
      //       logs: logsResponse.data
      //     };
      //   }
      // },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;