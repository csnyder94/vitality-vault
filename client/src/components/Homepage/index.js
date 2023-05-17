import React from 'react';
import { Link } from 'react-router-dom';
import hero from '../../images/Hero-image.png';
import ExerciseForm from '../ExerciseForm';

import Auth from '../../utils/auth';

const Homepage = () => {
	return (
		<div className='flex flex-row justify-between items-center h-screen p-10'>
			<div className='w-1/2 space-y-5'>
				<h1 className='text-4xl font-bold'>Welcome to Our Workout Website</h1>
				<p className='text-xl'>
					Here you can explore a variety of exercises, create your own workout routines, and track your progress. Ready to get started?
				</p>
				<Link to='/exercises' className='bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 mt-9 rounded'>
					Explore Exercises
				</Link>
			</div>
			<div className='w-1/2'>
				<img src={hero} alt='Workout' className='h-full w-full object-cover' />
			</div>
		</div>
	);
};

export default Homepage;
