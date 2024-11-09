// src/ExercisesIndex.jsx
import {useLoaderData} from "react-router-dom";
import { RoutineForm } from "./components/RoutineForm";
import { useRoutineForm } from "./hooks/useRoutineForm";

export function ExercisesIndex () {
  const exercises = useLoaderData ();
  // console.log(exercises);
  const {formData, handleAddExercise, handleFieldChange} = useRoutineForm();

  // console.log(`Current Form Data:`, formData);

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
              <RoutineForm
                exerciseId={exercise.id}
                onSubmit={handleAddExercise}
                onFieldChange={handleFieldChange}
                formData={formData}
              />
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}