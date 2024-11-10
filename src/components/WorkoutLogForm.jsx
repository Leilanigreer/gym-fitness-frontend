// src/components/WorkoutLogForm.jsx
import { useWorkoutLogForm } from "../hooks/useWorkoutLogForm";

export function WorkoutLogForm({ routine, selectedDate, onSuccess }) {
  const {
    formData,
    handleSubmit,
    handleInputChange
  } = useWorkoutLogForm(routine, selectedDate, onSuccess);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Sets Completed</label>
        <input
          type="number"
          name="actual_sets"
          className="form-control"
          value={formData.actual_sets}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Reps per Set</label>
        <input
          type="number"
          name="actual_reps"
          className="form-control"
          value={formData.actual_reps}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Notes</label>
        <textarea
          name="notes"
          className="form-control"
          value={formData.notes}
          onChange={handleInputChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Log Workout
      </button>
    </form>
  );
}