// src/hooks/useWorkoutLogForm.js
import { useState } from "react";
import axios from "axios";

export function useWorkoutLogForm(routine, selectedDate, onSuccess) {
  const [formData, setFormData] = useState({
    actual_sets: routine.sets,
    actual_reps: routine.reps,
    notes: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const params = {
        routine_id: routine.id,
        workout_date: selectedDate.toISOString().split('T')[0],
        completed: true,
        ...formData
    };

    try {
      await axios.post("http://localhost:3000/workout_logs.json", params);
      
      // // Clear form
      // setFormData({
      //   actual_sets: routine.sets,
      //   actual_reps: routine.reps,
      //   notes: ''
      // });
      
      // Call success callback if provided
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error logging workout:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('_') ? parseInt(value) : value
    }));
  };

  return {
    formData,
    handleSubmit,
    handleInputChange
  };
}