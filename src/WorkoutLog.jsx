// src/WorkoutLog.jsx
import { useState } from 'react';
import { useLoaderData, useRevalidator } from 'react-router-dom';
import Calendar from 'react-calendar';
import { WorkoutLogForm } from './components/WorkoutLogForm';

export function WorkoutLog() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  
  const { dates = [] } = useLoaderData();
  console.log(dates);

  const revalidator = useRevalidator();

  const handleLogUpdate = () => {
    revalidator.revalidate();
  };

  const getDayName = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const formatDateForComparison = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${
      String(d.getMonth() + 1).padStart(2, '0')}-${
      String(d.getDate()).padStart(2, '0')}`;
  };

  // Find routines for selected date
  const selectedDateData = dates.find(dateData => 
    dateData.date === formatDateForComparison(selectedDate)
  );

  const getNoRoutinesMessage = () => {
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);
    
    // If date is in the future
    if (selectedDate > today) {
      return "No routines scheduled for this day.";
    }
    // If date is more than a month old and no data
    else if (selectedDate < oneMonthAgo && !selectedDateData) {
      return "No workouts were logged for this day.";
    }
    // Default message for recent dates without data
    return "No routines scheduled for this day.";
  };

  const goToPreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const handleCalendarSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  // Error state display if no data
  if (!Array.isArray(dates)) {
    return (
      <div className="alert alert-danger">
        Error: Failed to load workout data. Please check your loader function.
        <pre>{JSON.stringify({ dates }, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div>
      {/* Navigation Controls */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="btn-group">
          <button 
            className="btn btn-outline-primary" 
            onClick={goToPreviousDay}
          >
            &lt; Previous Day
          </button>
          <button 
            className="btn btn-primary" 
            onClick={goToToday}
          >
            Today
          </button>
          <button 
            className="btn btn-outline-primary" 
            onClick={goToNextDay}
          >
            Next Day &gt;
          </button>
        </div>
        
        <button 
          className="btn btn-secondary"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          📅 Calendar
        </button>
      </div>

      {/* Calendar Popup */}
      {showCalendar && (
        <div className="card mb-3">
          <div className="card-body">
            <Calendar
              onChange={handleCalendarSelect}
              value={selectedDate}
              maxDate={new Date()}
            />
          </div>
        </div>
      )}

      {/* Selected Date Display */}
      <h2>
        Workout Log for {selectedDate.toLocaleDateString()} ({getDayName(selectedDate)})
        {selectedDate.toDateString() === new Date().toDateString() && 
          " (Today)"
        }
      </h2>

      {/* Routines List */}
      {selectedDateData?.routines.map(routine => (
        <div key={routine.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{routine.exercise_name}</h5>
            <WorkoutLogForm 
              routine={routine} 
              selectedDate={selectedDate}
              onSuccess={() => handleLogUpdate()}
            />
          </div>
        </div>
      )) || (
        <div className="alert alert-info">
          {getNoRoutinesMessage()}
        </div>
      )}
    </div>
  );
}