import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const ExerciseList = ({
  exercises
}) => {
  if (!exercises.length) {
    return <h3>No Exercises Yet</h3>;
  }

  return (
    <div>
    {Auth.loggedIn() ? (
      <>
    <div>
      {exercises &&
        exercises.map((exercise) => (
          <div key={exercise._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
             {exercise.name}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{exercise.description}</p>
              <p>{exercise.type}</p>
            </div>
          </div>
        ))}
    </div>
    </>
    ) : (
      <p></p>
    )}
    </div>
  );
  
};

export default ExerciseList;
