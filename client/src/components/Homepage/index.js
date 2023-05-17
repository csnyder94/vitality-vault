import React from 'react';
import { Link } from 'react-router-dom';
import hero from '../../images/Hero-image.png';
import ExerciseForm from '../ExerciseForm';

import Auth from '../../utils/auth';

const Homepage = () => {
	return (
		<div className='md:flex md:flex-row flex-col md:justify-between items-center p-10'>
			<div className='md:w-1/2 w-full space-y-5 justify-center md:text-left text-center'>
				<h1 className='md:text-4xl text-xl font-bold'>Welcome to Vitality Vault</h1>
				<div className='flex flex-col space-y-5'>
					<p className='md:text-xl text:md'>
						Here you can explore a variety of exercises, create your own workout routines, and track your progress. Ready to get started?
					</p>
					<Link to='/Login' className='bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded justify-center'>
						Login to Explore Exercises
					</Link>
				</div>
			</div>
			<div className='md:w-1/2 w-full mt-10 md:mt-0'>
				<img src={hero} alt='Workout' className='h-full w-full object-cover' />
			</div>
		</div>
	);
};

export default Homepage;
