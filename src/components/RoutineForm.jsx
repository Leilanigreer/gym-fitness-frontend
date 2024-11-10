// src/components/RoutineForm.jsx
import { DAYS_ARRAY } from "../constants/days";

export function RoutineForm({ onSubmit, exerciseId, formData = {}, onFieldChange }) {
  const { day = {}, reps = {}, sets = {} } = formData;

  const handleChange = (field, value) => {
    if (typeof onFieldChange === 'function') {
      onFieldChange(field, exerciseId, value);
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e, exerciseId)}>
      <div className="form-group">
        <label htmlFor={`day-${exerciseId}`}>Day of the week</label>
        <select
          id={`day-${exerciseId}`}
          className="form-control"
          name="day"
          value={day[exerciseId] || ""}
          onChange={(e) => handleChange("day", e.target.value)}
        >
          <option value="">Select a day</option>
          {DAYS_ARRAY.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={`reps-${exerciseId}`}>Number of reps:</label>
        <input
          id={`reps-${exerciseId}`}
          type="number"
          value={reps[exerciseId] || ""}
          onChange={(e) => handleChange("reps", e.target.value)}
          name="reps"
          className="form-control mb-2"
        />
      </div>
      <div>
        <label htmlFor={`sets-${exerciseId}`}>Sets:</label>
        <input
          id={`sets-${exerciseId}`}
          type="number"
          value={sets[exerciseId] || ""}
          onChange={(e) => handleChange("sets", e.target.value)}
          name="sets"
          className="form-control mb-2"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Create Routine
      </button>
    </form>
  );
}