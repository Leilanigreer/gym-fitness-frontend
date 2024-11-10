// src/components/WorkoutLogForm.jsx
import { useWorkoutLogForm } from "../hooks/useWorkoutLogForm";

export function WorkoutLogForm({ routine, selectedDate, existingLog, onSuccess }) {
  const {
    formData,
    handleSubmit,
    handleInputChange
  } = useWorkoutLogForm(routine, selectedDate, existingLog, onSuccess);

  return (
    <form onSubmit={handleSubmit}>
      <div className="card-text mb-3">
        <small className="text-muted">
          Goal: {routine.sets} sets of {routine.reps} reps
        </small>
      </div>

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
        {existingLog ? 'Update Workout' : 'Log Workout'}
      </button>

      {existingLog && (
        <div className="mt-2">
          <small className="text-muted">
            Last updated: {new Date(existingLog.updated_at).toLocaleString()}
          </small>
        </div>
      )}
    </form>
  );
}