import { useLoaderData } from "react-router-dom";
import { DAYS_ARRAY } from "./constants/days";
import { useState } from "react";

export function RoutinesIndex () {
  const routines = useLoaderData ();
  console.log(routines);
  const [selectedDay, setSelectedDay] = useState("All Routines");


  const handleDayChange = (day) => {
    setSelectedDay(day);
  };

  const filteredRoutines = selectedDay === "All Routines"
  ? routines
  : routines.filter(routine => routine.day === selectedDay);

  return (
  <div> 
      <div className="dropdown">
        <button 
        className="btn btn-secondary btn-sm dropdown-toggle" 
        type="button" 
        id="dropdownMenuButton" 
        data-bs-toggle="dropdown" 
        aria-expanded="false"
        >
          {selectedDay}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li>
            <button
            className="dropdown-item"
            type="button"
            onClick={() => handleDayChange("All Routines")}>
              All Routines
            </button>
          </li>
          {DAYS_ARRAY.map((day) => (
            <li key={day}>
              <button
              className="dropdown-item"
              type="button"
              onClick={() => handleDayChange(day)}>
                {day}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <h4>Your Current routines for {selectedDay}</h4>
    {filteredRoutines.map ((routine) => 
    <div key={routine.id}>
      <p>Exercise: {routine.exercise.name}</p>
      <p>Sets: {routine.sets}</p>
      <p>Reps: {routine.reps}</p>
    </div>
    )}
  </div>
  )
};