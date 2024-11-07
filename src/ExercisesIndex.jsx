import axios from "axios";
import { useState } from "react";
import {useLoaderData} from "react-router-dom"

export function ExercisesIndex () {
  const exercises = useLoaderData ();
  // console.log(exercises);
  const [routines, setRoutines] = useState([]);
  const [reps, setReps] = useState({});

  const handleAddExercise = (event, exerciseId) => {
    event.preventDefault();

      const params = {
        exercise_id: exerciseId,
        reps: reps[exerciseId] || 0
      };

      axios.post("http://localhost:3000/routines.json", params).then((response) => {
        setRoutines([...routines, response.data])
      });
  };

  const handleRepsChange = (exerciseId, value) => {
    setReps(prev => ({...prev, [exerciseId]: value}));
  };

  return (
    <div>
      <h2>Hello from Exercises Index</h2>
      {exercises.map((exercise) => (
      <div key={exercise.id}>
        <h3>{exercise.name}</h3>
        <a href={exercise.video_url}>Watch the video</a>
        <p>{exercise.description}</p>
        <img src={exercise.image_url} width="300" height="400"/>
        <form onSubmit={(e) => handleAddExercise(e,exercise.id)}>
          <div>
            Number of reps:
            <input 
              type="number" 
              value={reps[exercise.id] || ''}
              onChange={(e) => handleRepsChange(exercise.id, e.target.value)}
              name="reps" 
            /> 
            <button type="submit">Log Reps</button>
          </div>
        </form>
      </div>
      ))}
    </div>
  );
}