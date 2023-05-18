import React from 'react';
import { useMutation } from '@apollo/client';
import { REMOVE_EXERCISE } from '../../utils/mutations';
import { QUERY_EXERCISES } from '../../utils/queries';
import Auth from '../../utils/auth';

const ExerciseList = ({ exercises }) => {
	const [removeExercise] = useMutation(REMOVE_EXERCISE, {
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
								<div key={exercise._id} className='p-4 md:w-1/2 w-full'>
									<div className='h-full bg-white rounded shadow-lg relative group'>
										<div className='flex justify-between items-center p-6 bg-amber-500 text-white'>
											<h4 className='text-lg font-medium'>{exercise.type}</h4>
											<button
												className='text-white bg-red-500 hover:bg-red-600 py-1 px-2 rounded opacity-0 group-hover:opacity-100'
												onClick={() => handleDeleteExercise(exercise._id)}
											>
												Delete
											</button>
										</div>

										<div className='p-6'>
											<div className='flex justify-between items-center'>
												<p className='font-bold text-xl'>Date: </p>
												<p className='leading-relaxed'>{exercise.date}</p>
											</div>
											<div className='flex justify-between items-center'>
												<p className='font-bold text-xl'>Weight: </p>
												<p className='mb-3' type='number'>
													{exercise.weight} lbs
												</p>
											</div>
											<div className='flex justify-between items-center'>
												<p className='font-bold text-xl'>Reps: </p>
												<p className='leading-relaxed' type='number'>
													{exercise.reps}{' '}
												</p>
											</div>

											<div className='flex justify-between items-center'>
												<p className='font-bold text-xl'>Note: </p>
												<p className='leading-relaxed ml-2'>{exercise.note}</p>
											</div>
										</div>
									</div>
								</div>
							))}
					</div>
				</>
			) : (
				<p>You must be logged in</p>
			)}
		</div>
	);
};

export default ExerciseList;
