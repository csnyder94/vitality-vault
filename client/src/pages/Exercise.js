import React from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';


import { QUERY_SINGLE_EXERCISE } from '../utils/queries';

const SingleExercise = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { exerciseId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_EXERCISE, {
    // pass URL parameter
    variables: { exerciseId: exerciseId },
  });

  const exercise = data?.exercise || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {exercise.type} <br />
        <span style={{ fontSize: '1rem' }}>
          was completed on {exercise.date}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {exercise.weight}
          {exercise.reps}
          {exercise.note}
        </blockquote>
      </div>

    </div>
  );
};

export default SingleExercise;
