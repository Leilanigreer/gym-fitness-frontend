// src/components/WorkoutLogNew.jsx
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Calendar from 'react-calendar';
import { WorkoutLogForm } from './components/WorkoutLogForm';

export function WorkoutLogNew() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  
  const { routines = [], logs = [] } = useLoaderData();

  // Arrow function for getting day name
  const getDayName = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  // Arrow functions for navigation handlers
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

  // Arrow function for handling calendar selection
  const handleCalendarSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  // Filter routines for selected day
  const filteredRoutines = routines.filter(routine => 
    routine.day === getDayName(selectedDate)
  );

  // Get logs for the selected date
  const selectedDateLogs = logs.filter(log => {
    const logDate = new Date(log.date);
    return logDate.toDateString() === selectedDate.toDateString();
  });

  // Error state display if no routines data
  if (!Array.isArray(routines)) {
    return (
      <div className="alert alert-danger">
        Error: Failed to load routines data. Please check your loader function.
        <pre>{JSON.stringify({ routines, logs }, null, 2)}</pre>
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
      {filteredRoutines.length === 0 ? (
        <p>No routines scheduled for this day</p>
      ) : (
        filteredRoutines.map(routine => {
          // Find existing log for this routine on this date
          const existingLog = selectedDateLogs.find(log => 
            log.routine_id === routine.id
          );

          return (
            <div key={routine.id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{routine.exercise.name}</h5>
                <WorkoutLogForm 
                  routine={routine} 
                  selectedDate={selectedDate}
                  existingLog={existingLog}
                />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

