import axios from "axios";
import { useState } from "react";
import {useLoaderData} from "react-router-dom";

export function ExercisesIndex () {
  const exercises = useLoaderData ();
  const [routines, setRoutines] = useState([]);
  const [reps, setReps] = useState({});
  const [day, setDay] = useState({});
  const [sets, setSets] = useState({});

  const handleAddExercise = (event, exerciseId) => {
    event.preventDefault();

    const params = {
      exercise_id: exerciseId,
      day: day[exerciseId],
      sets: sets[exerciseId],
      reps: reps[exerciseId],
    };
    console.log(params);

    axios.post("http://localhost:3000/routines.json", params).then((response) => {
      setRoutines([...routines, response.data])
    });
  };

  const handleRepsChange = (exerciseId, value) => {
    setReps(prev => ({...prev, [exerciseId]: value}));
  };
  const handleDayChange = (exerciseId, value) => {
    setDay(prev => ({...prev, [exerciseId]: value}));
  };
  const handleSetsChange = (exerciseId, value) => {
    setSets(prev => ({...prev, [exerciseId]: value}));
  };

  const now = new Date();
  // console.log(now);
  const date = now.toLocaleDateString();
  // console.log(date);

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
                <div className="form-group">
                  <label name="day"> Day of the week</label>
                  <select className="form-control" name="day" value={day[exercise.id]} onChange={(e) => handleDayChange(exercise.id, e.target.value)}>
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                    <option>Sunday</option>
                  </select>
                </div>
                <div>
                  Number of reps:
                  <input 
                    type="number" 
                    value={reps[exercise.id]}
                    onChange={(e) => handleRepsChange(exercise.id, e.target.value)}
                    name="reps" 
                    className="form-control mb-2"
                  /> 
                </div>
                <div>
                  Sets:
                  <input 
                    type="number"
                    value={sets[exercise.id]}
                    onChange={(e) => handleSetsChange(exercise.id, e.target.value)}
                    name="sets"
                    className="form-control mb-2"
                  />
                </div>
                  <button type="submit" className="btn btn-primary">Log Reps</button>
              </form>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}