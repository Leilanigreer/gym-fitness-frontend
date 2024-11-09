// src/hooks/useRoutineForm.js
import { useState } from "react";
import axios from "axios";

export function useRoutineForm() {
  const [formData, setFormData] = useState({
    reps: {},
    day: {},
    sets: {},
  });

  const handleAddExercise = async (event, exerciseId) => {
    event.preventDefault();

    const params = {
      exercise_id: exerciseId,
      day: formData.day[exerciseId],
      sets: formData.sets[exerciseId],
      reps: formData.reps[exerciseId],
    };

    try {
      await axios.post("http://localhost:3000/routines.json", params);
      
      // Clear form data for this exercise
      setFormData(prev => ({
        reps: { ...prev.reps, [exerciseId]: "" },
        day: { ...prev.day, [exerciseId]: "" },
        sets: { ...prev.sets, [exerciseId]: "" },
      }));
    } catch (error) {
      console.error("Error adding exercise:", error);
    }
  };

  const handleFieldChange = (field, exerciseId, value) => {
    // console.log(`Updating ${field} for exercise ${exerciseId} to ${value}`)
    setFormData(prev => ({
      ...prev,
      [field]: { ...prev[field], [exerciseId]: value },
    }));
  };

  return {
    formData,
    handleAddExercise,
    handleFieldChange,
  };
}