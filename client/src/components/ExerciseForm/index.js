import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_EXERCISE, REMOVE_EXERCISE } from '../../utils/mutations';
import { QUERY_EXERCISES, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const ExerciseForm = () => {
	const [type, setExerciseType] = useState('');
	const [weight, setExerciseWeight] = useState('');
	const [reps, setExerciseReps] = useState('');
	const [note, setExerciseNote] = useState('');

	const [addExercise, { error }] = useMutation(ADD_EXERCISE, {
		update(cache, { data: { addExercise } }) {
			try {
				const { exercises } = cache.readQuery({ query: QUERY_EXERCISES });

				cache.writeQuery({
					query: QUERY_EXERCISES,
					data: { exercises: [addExercise, ...exercises] },
				});
			} catch (e) {
				console.error(e);
			}
		},
	});

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
	

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			await addExercise({
				variables: {
					type,
					weight,
					reps,
					note
				},
			});

			setExerciseType('');
			setExerciseWeight('');
			setExerciseReps('');
			setExerciseNote('');
		} catch (err) {
			console.error(err);
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		if (name === 'exerciseType') {
			setExerciseType(value);
		  }
		  if (name === 'exerciseWeight') {
			const weightValue = parseFloat(value);
			setExerciseWeight(weightValue);
		  }
		  if (name === 'exerciseReps') {
			const repsValue = parseInt(value, 10);
			setExerciseReps(repsValue);
		  }
		  if (name === 'exerciseNote') {
			setExerciseNote(value);
		  }
		}

	const handleDeleteExercise = async (exerciseId) => {
		try {
		  await removeExercise({
			variables: { exerciseId },
		  });
		} catch (err) {
		  console.error(err);
		}
	  };

	return (
		<div>
			{Auth.loggedIn() ? (
				<>
					<h3 className='text-lg font-semibold'>What exercise will you complete today?</h3>
					<form className='flex flex-col lg:flex-row justify-between items-center' onSubmit={handleFormSubmit}>
						<div className='w-full lg:w-3/4'>
						<input
								name='exerciseType'
								placeholder='Exercise Type'
								value={type}
								className='w-full px-3 py-2 mb-3 border border-gray-300 rounded-md'
								onChange={handleChange}
							/>
							<input
								name='exerciseWeight'
								placeholder="Exercise Weight"
								type='number'
								value={weight}
								className='w-full px-3 py-2 mb-3 border border-gray-300 rounded-md'
								onChange={handleChange}
							/>
							<input
								name='exerciseReps'
								placeholder='Exercise Reps'
								type='number'
								value={reps}
								className='w-full px-3 py-2 mb-3 border border-gray-300 rounded-md'
								onChange={handleChange}
							/>
							<textarea
								name='exerciseNote'
								placeholder='Exercise Note'
								value={note}
								className='w-full px-3 py-2 mb-3 border border-gray-300 rounded-md'
								onChange={handleChange}
							/>
						</div>

						<div className='w-full lg:w-1/4'>
							<button className='w-full py-2 text-white bg-amber-500 hover:bg-amber-600 rounded-md ml-2' type='submit'>
								Add Exercise
							</button>
						</div>
						{error && <div className='w-full my-3 p-3 bg-red-500 text-white'>{error.message}</div>}
						{deleteError && <div className='w-full my-3 p-3 bg-red-500 text-white'>{deleteError.message}</div>}
					</form>
				</>
			) : (
				<p>
					You need to be logged in to track your workouts. Please{' '}
					<Link to='/login' className='text-amber-500'>
						login
					</Link>{' '}
					or{' '}
					<Link to='/signup' className='text-amber-500'>
						signup.
					</Link>
				</p>
			)}
		</div>
	);
};

export default ExerciseForm;
