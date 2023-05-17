import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const ExerciseList = ({ exercises }) => {
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
										<h4 className='text-lg font-medium mb-4 p-6 bg-amber-500 text-white'>{exercise.name}</h4>
										<div className='p-6'>
											<p className='leading-relaxed mb-3'>{exercise.description}</p>
											<p className='leading-relaxed'>{exercise.type}</p>
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
