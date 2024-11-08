import { useLoaderData } from "react-router-dom";

export function RoutinesIndex () {
  const routines = useLoaderData ();

  return (
  <div> 
    <h1>This is just a test</h1>
    {routines.map ((routine) => 
    <div key={routine.id}>
      <p>Day: {routine.day}</p>
      <p>Sets: {routine.sets}</p>
      <p>Reps: {routine.reps}</p>
    </div>
    )}
  </div>
  )
};