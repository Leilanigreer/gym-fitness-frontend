// src/ExercisesIndex.jsx
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { RoutineForm } from "./components/RoutineForm";
import { useRoutineForm } from "./hooks/useRoutineForm";
import { isAuthenticated } from "./utils/auth";
import { useState, useMemo } from "react";

export function ExercisesIndex() {
  const exercises = useLoaderData();

  const [filters, setFilters] = useState({
    level: '',
    category: '',
    equipment: ''
  });

  const uniqueValues = useMemo(() => {
    return {
      level: [...new Set(exercises.map(ex => ex.level))]
        .filter(Boolean)
        .sort()
        .map(level => ({
          value: level,
          display: exercises.find(ex => ex.level === level).capital_level
        })),
      category: [...new Set(exercises.map(ex => ex.category))]
        .filter(Boolean)
        .sort()
        .map(category => ({
          value: category,
          display: exercises.find(ex => ex.category === category).capital_category
        })),
      equipment: [...new Set(exercises.map(ex => ex.equipment))]
        .filter(Boolean)
        .sort()
        .map(equipment => ({
          value: equipment,
          display: exercises.find(ex => ex.equipment === equipment).capital_equipment
        }))
    };
  }, [exercises]);

  const { formData, handleAddExercise, handleFieldChange } = useRoutineForm();

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value
    }));
  };

  const filteredExercises = exercises.filter(exercise => {
    return (
      (filters.level === '' || exercise.level === filters.level) &&
      (filters.category === '' || exercise.category === filters.category) &&
      (filters.equipment === '' || exercise.equipment === filters.equipment)
    );
  });

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
          className="btn btn-success btn-sm" 
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

  const getImageUrl = (imagePath) => {
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    const baseUrl = 'http://localhost:3000'; // Change this to match your Rails server URL
    return `${baseUrl}${imagePath}`;
  };

  return (
    <div className="container-fluid bg-light min-vh-100">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-md-11 col-sm-12 py-4">
          <h1 className="display-4 mb-4 fw-bold text-purple text-center">
            Are you ready to get in shape? Here we go!
          </h1>
            <div className="row-g4">
              <h2> This is just a test</h2>
              <select 
                className="form-select" 
                value={filters.level}
                onChange={(e) => handleFilterChange('level', e.target.value)}
                aria-label="Exercise level"
              >
                <option value="">Exercise Level</option>
                {uniqueValues.level.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.display}
                  </option>
                ))}
              </select>
              <select 
                className="form-select"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                aria-label="Exercise Category"
              >
                <option value="">Category</option>
                {uniqueValues.category.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.display}
                  </option>
                ))}
              </select>
              <select 
                className="form-select"
                value={filters.equipment}
                onChange={(e) => handleFilterChange('equipment', e.target.value)}
                aria-label="Exercise Equipment"
              >
                <option value="">Equipment</option>
                {uniqueValues.equipment.map(equipment => (
                  <option key={equipment.value} value={equipment.value}>
                    {equipment.display}
                  </option>
                ))}
              </select>
          </div>
          <div className="row g-4">
            {filteredExercises.map((exercise) => (
              <div key={exercise.id} className="col-sm-6 col-md-4 col-lg-3">
                <div className="card h-100 shadow-sm">
                  {exercise.images && exercise.images.length > 0 && (
                    <div id={`carousel-${exercise.id}`} className="carousel slide" data-bs-ride="carousel">
                      <div className="carousel-inner">
                        {exercise.images.map((image, index) => (
                          <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <img 
                              src={getImageUrl(image)}
                              className="card-img-top d-block w-100"
                              alt={`${exercise.name} position ${index + 1}`}
                              onError={(e) => {
                                console.error(`Failed to load image: ${image}`);
                                e.target.src = '/placeholder-exercise.png';
                              }}
                            />
                          </div>
                        ))}
                      </div>
                      {exercise.images.length > 1 && (
                        <>
                          <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${exercise.id}`} data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                          </button>
                          <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${exercise.id}`} data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                          </button>
                        </>
                      )}
                    </div>
                  )}
                  <div className="card-body">
                    <h3 className="h5 card-title">{exercise.name}</h3>
                    <p className="card-text">Level: {exercise.capital_level}</p>
                    <p className="card-text">Category: {exercise.capital_category}</p>
                    <p className="card-text">Equipment: {exercise.capital_equipment}</p>
                    
                    {/* <p className="card-text">{exercise.instructions}</p> */}
                    {/* <Link 
                      to={exercise.video_url} 
                      className="text-decoration-none"
                    >
                      Watch the video
                    </Link> */}
                    
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