import React from 'react';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';

import ExerciseList from '../components/ExerciseList';
import ExerciseForm from '../components/ExerciseForm';
import Homepage from '../components/Homepage';

import { QUERY_EXERCISES } from '../utils/queries';

const Home = () => {
	const { loading, data } = useQuery(QUERY_EXERCISES);
	// const exercise = data?.exercise || [];
	console.log(data);
	return (
		<main>
			<>
				{Auth.loggedIn() ? (
					<>
						<div className='flex-row justify-center'>
							<div className='col-12 col-md-10 mb-3 p-3' style={{ border: '1px dotted #1a1a1a' }}>
								<ExerciseForm />
							</div>
							<div className='col-12 col-md-8 mb-3'>{loading ? <div>Loading...</div> : <ExerciseList exercises={data.exercises} exerciseId={data.exercises._id} />}</div>
						</div>
					</>
				) : (
					<Homepage />
				)}
			</>
		</main>
	);
};

export default Home;
