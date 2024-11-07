import {useLoaderData} from "react-router-dom"

export function ExercisesIndex () {

  const exercises = useLoaderData ();
  // console.log(exercises);

  return (
    <div>
    <h2>Hello from Exercises Index</h2>
    {exercises.map((exercise) => (
    <div key={exercise.id}>
      <h3>{exercise.name}</h3>
      <a href={exercise.video_url}>Watch the video</a>
      <p>{exercise.description}</p>
      <img src={exercise.image_url} width="300" height="400"/>
    </div>
    ))}
    </div>
  );
}