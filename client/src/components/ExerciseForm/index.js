import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_EXERCISE } from '../../utils/mutations';
import { QUERY_EXERCISES, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const ExerciseForm = () => {
	const [name, setExerciseName] = useState('');
	const [description, setExerciseDescription] = useState('');
	const [type, setExerciseType] = useState('');

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

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			await addExercise({
				variables: {
					name,
					description,
					type,
				},
			});

			setExerciseName('');
			setExerciseDescription('');
			setExerciseType('');
		} catch (err) {
			console.error(err);
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		if (name === 'exerciseName') {
			setExerciseName(value);
		}
		if (name === 'exerciseDescription') {
			setExerciseDescription(value);
		}
		if (name === 'exerciseType') {
			setExerciseType(value);
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
								name='exerciseName'
								placeholder='Exercise Name'
								value={name}
								className='w-full px-3 py-2 mb-3 border border-gray-300 rounded-md'
								onChange={handleChange}
							/>
							<textarea
								name='exerciseDescription'
								placeholder="Here's today's exercise:"
								value={description}
								className='w-full px-3 py-2 mb-3 border border-gray-300 rounded-md'
								onChange={handleChange}
							/>
							<input
								name='exerciseType'
								placeholder='Exercise Type'
								value={type}
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
