import axios from "axios";
import { useState } from "react";
import {useLoaderData} from "react-router-dom";

export function ExercisesIndex () {
  const exercises = useLoaderData ();
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

  const now = new Date();
  console.log(now);
  const date = now.toLocaleDateString();
  console.log(date);

  return (
    <div className="container">
      <h2>Your exercises for {date} </h2>
      <div className="row">
        {exercises.map((exercise) => (
        <div key={exercise.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
          <div className="card" style={{ width: "100%" }}>
            <img src={exercise.image_url} className="card-img-top" alt={exercise.name}/>
            <div className="card-body">
              <h3 className="card-title">{exercise.name}</h3>
              <a href={exercise.video_url}>Watch the video</a>
              <p className="card-text">{exercise.description}</p>
              <form onSubmit={(e) => handleAddExercise(e,exercise.id)}>
                <div>
                  Number of reps:
                  <input 
                    type="number" 
                    value={reps[exercise.id] || ''}
                    onChange={(e) => handleRepsChange(exercise.id, e.target.value)}
                    name="reps" 
                    className="form-control mb-2"
                  /> 
                  <button type="submit" className="btn btn-primary">Log Reps</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}