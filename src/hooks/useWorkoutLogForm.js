// src/hooks/useWorkoutLogForm.js
import { useState, useEffect } from "react";
import axios from "axios";

export function useWorkoutLogForm(routine, selectedDate, existingLog, onSuccess) {
  const [formData, setFormData] = useState({
    actual_sets: routine.sets,
    actual_reps: routine.reps,
    notes: ''
  });

  useEffect(() => {
    if (existingLog) {
      setFormData({
        actual_sets: existingLog.actual_sets,
        actual_reps: existingLog.actual_reps,
        notes: existingLog.notes || ''
      });
    } else {
      setFormData({
        actual_sets: routine.sets,
        actual_reps: routine.reps,
        notes: ''
      });
    }
  }, [existingLog, routine]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dateToUse = new Date(selectedDate);
    dateToUse.setHours(12, 0, 0, 0);

    const formattedDate = `${dateToUse.getFullYear()}-${
      String(dateToUse.getMonth() + 1).padStart(2, '0')}-${
      String(dateToUse.getDate()).padStart(2, '0')}`;
    
    const params = {
        routine_id: routine.id,
        workout_date: formattedDate,
        completed: true,
        ...formData
    };

    try {
      let response;
      if (existingLog) {
        response = await axios.patch(
          `http://localhost:3000/workout_logs/${existingLog.id}.json`,
          params
        );
      } else {
        response = await axios.post("http://localhost:3000/workout_logs.json", params);
      }
      
      if (onSuccess) onSuccess(response.data);
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