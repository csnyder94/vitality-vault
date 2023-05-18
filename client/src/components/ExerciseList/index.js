import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REMOVE_EXERCISE } from '../../utils/mutations';
import { QUERY_EXERCISES, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';

const ExerciseList = ({ exercises }) => {
	const [removeExercise, { error: deleteError }] = useMutation(REMOVE_EXERCISE, {
		update(cache, { data: { removeExercise } }) {
		  try {
			const { exercises } = cache.readQuery({ query: QUERY_EXERCISES });
	
			cache.writeQuery({
			  query: QUERY_EXERCISES,
			  data: { exercises: exercises.filter((exercise) => exercise._id !== removeExercise._id) },
			});
		  } catch (e) {
			console.error(e);
		  }
		},
	  });
	

  const handleDeleteExercise = async (exerciseId) => {
    try {
	
      await removeExercise({
        variables: { exerciseId },
		update(cache) {
			const { exercises } = cache.readQuery({ query: QUERY_EXERCISES });
	
			cache.writeQuery({
			  query: QUERY_EXERCISES,
			  data: { exercises: exercises.filter((exercise) => exercise._id !== exerciseId) },
			});
		  },
      });
	  
    } catch (err) {
      console.error(err);
    }
  };

  if (!exercises.length) {
    return <h3>No Exercises Yet</h3>;
  }

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <div className='flex flex-wrap m-4'>
            {exercises &&
              exercises.map((exercise) => (
                <div key={exercise._id} className='p-4 lg:w-1/3 md:w-1/2 w-full'>
                  <div className='h-full bg-white rounded shadow-lg'>
                    <h4 className='text-lg font-medium mb-4 p-6 bg-amber-500 text-white'>{exercise.type}</h4>
                    <div className='p-6'>
                      <p className='leading-relaxed mb-3' type='number'>Exercise Weight: {exercise.weight} lbs</p>
                      <p className='leading-relaxed' type='number'>Exercise Reps: {exercise.reps}</p>
					  <p className='leading-relaxed'>Note: {exercise.note}</p>
					  <p className='leading-relaxed' >Date: {exercise.date}</p>
			
                      <button
                        className='text-white bg-red-500 hover:bg-red-600 py-2 px-4 mt-4 rounded'
                        onClick={() => handleDeleteExercise(exercise._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      ) : (
        <p>hello hi there</p>
      )}
    </div>
  );
};

export default ExerciseList;
