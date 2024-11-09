// src/ExercisesIndex.jsx
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { RoutineForm } from "./components/RoutineForm";
import { useRoutineForm } from "./hooks/useRoutineForm";
import { isAuthenticated } from "./utils/auth";

export function ExercisesIndex() {
  const exercises = useLoaderData();
  const { formData, handleAddExercise, handleFieldChange } = useRoutineForm();

  const renderScheduledDays = (exercise) => {
    if (!isAuthenticated() || !exercise.scheduled_days || 
        Object.keys(exercise.scheduled_days).length === 0) {
      return null;
    }

    return (
      <div className="mt-3 mb-3">
        <small className="text-muted d-block mb-2">Currently scheduled on:</small>
        <div className="d-flex flex-wrap gap-2">
          {Object.entries(exercise.scheduled_days).map(([day]) => (
            <span key={day} className="badge bg-secondary">
              {day}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderAddRoutineSection = (exercise) => {
    if (!isAuthenticated()) {
      return (
        <div className="mt-3">
          <div className="alert alert-info" role="alert">
            <Link to="/login" className="alert-link">Log in</Link> or{" "}
            <Link to="/signup" className="alert-link">sign up</Link>{" "}
            to add this exercise to your routine!
          </div>
        </div>
      );
    }

    return (
      <div className="mt-3">
        <button 
          className="btn btn-success btn-sm" // Matching your secondary button style
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target={`#routineForm${exercise.id}`}
          aria-expanded="false"
        >
          + Add to Routine
        </button>
        
        <div className="collapse" id={`routineForm${exercise.id}`}>
          <div className="card card-body bg-light">
            <RoutineForm
              exerciseId={exercise.id}
              onSubmit={handleAddExercise}
              onFieldChange={handleFieldChange}
              formData={formData}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container-fluid bg-light min-vh-100">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-md-11 col-sm-12 py-4">
          <h1 className="display-4 mb-4 fw-bold text-purple text-center">
            Are you ready to get in shape? Here we go!
          </h1>
          
          <div className="row g-4">
            {exercises.map((exercise) => (
              <div key={exercise.id} className="col-sm-6 col-md-4 col-lg-3">
                <div className="card h-100 shadow-sm">
                  {exercise.image_url && (
                    <img 
                      src={exercise.image_url} 
                      className="card-img-top"
                      alt={exercise.name}
                    />
                  )}
                  <div className="card-body">
                    <h3 className="h5 card-title">{exercise.name}</h3>
                    <p className="card-text">{exercise.description}</p>
                    <Link 
                      to={exercise.video_url} 
                      className="text-decoration-none"
                    >
                      Watch the video
                    </Link>
                    
                    {renderScheduledDays(exercise)}
                    {renderAddRoutineSection(exercise)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}