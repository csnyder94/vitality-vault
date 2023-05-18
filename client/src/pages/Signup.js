import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import heroMan from '../images/hero-man.png';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
	const [formState, setFormState] = useState({
		username: '',
		email: '',
		password: '',
	});
	const [addUser, { error, data }] = useMutation(ADD_USER);

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			[name]: value,
		});
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		console.log(formState);

		try {
			const { data } = await addUser({
				variables: { ...formState },
			});

			Auth.login(data.addUser.token);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<main className='flex flex-col items-center mb-4'>
			<div className='w-full lg:w-10/12'>
				<div className='bg-white shadow-lg rounded-lg'>
					<h4 className='bg-amber-500 text-white text-center p-2 rounded-t-lg'>Sign Up</h4>
					<div className='p-4'>
						{data ? (
							<p className='text-center'>
								Success! You may now head{' '}
								<Link to='/' className='text-amber-500 underline'>
									back to the homepage.
								</Link>
							</p>
						) : (
							<form onSubmit={handleFormSubmit} className='space-y-4'>
								<input
									className='w-full p-2 border-2 border-gray-300 rounded-lg'
									placeholder='Your username'
									name='username'
									type='text'
									value={formState.name}
									onChange={handleChange}
								/>
								<input
									className='w-full p-2 border-2 border-gray-300 rounded-lg'
									placeholder='Your email'
									name='email'
									type='email'
									value={formState.email}
									onChange={handleChange}
								/>
								<input
									className='w-full p-2 border-2 border-gray-300 rounded-lg'
									placeholder='******'
									name='password'
									type='password'
									value={formState.password}
									onChange={handleChange}
								/>
								<button className='w-full py-2 text-white bg-amber-500 hover:bg-amber-600 rounded-lg' type='submit'>
									Submit
								</button>
							</form>
						)}

						{error && <div className='my-3 p-3 bg-red-600 text-white'>{error.message}</div>}
					</div>
				</div>
			</div>
			<img src={heroMan} alt='Workout man' className='h-50 w-50 justify-center' />
		</main>
	);
};

export default Signup;
