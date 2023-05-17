import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import heroWoman from '../images/hero-woman.png';

import Auth from '../utils/auth';

const Login = (props) => {
	const [formState, setFormState] = useState({ email: '', password: '' });
	const [login, { error, data }] = useMutation(LOGIN_USER);

	// update state based on form input changes
	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			[name]: value,
		});
	};

	// submit form
	const handleFormSubmit = async (event) => {
		event.preventDefault();
		console.log(formState);
		try {
			const { data } = await login({
				variables: { ...formState },
			});

			Auth.login(data.login.token);
		} catch (e) {
			console.error(e);
		}

		// clear form values
		setFormState({
			email: '',
			password: '',
		});
	};

	return (
		<main className='flex flex-col items-center mb-4'>
			<div className='w-full lg:w-3/4'>
				<div className='bg-white shadow rounded-lg'>
					<h4 className='bg-amber-500 text-white p-2'>Login</h4>
					<div className='p-4'>
						{data ? (
							<p>
								Success! You may now head{' '}
								<Link to='/' className='text-amber-500'>
									back to the homepage.
								</Link>
							</p>
						) : (
							<form onSubmit={handleFormSubmit}>
								<input
									className='w-full px-3 py-2 mb-3 border border-gray-300 rounded-md'
									placeholder='Your email'
									name='email'
									type='email'
									value={formState.email}
									onChange={handleChange}
								/>
								<input
									className='w-full px-3 py-2 mb-3 border border-gray-300 rounded-md'
									placeholder='******'
									name='password'
									type='password'
									value={formState.password}
									onChange={handleChange}
								/>
								<button className='w-full py-2 text-white bg-amber-500 hover:bg-amber-600 rounded-md' type='submit'>
									Submit
								</button>
							</form>
						)}

						{error && <div className='my-3 p-3 bg-red-500 text-white'>{error.message}</div>}
					</div>
				</div>
			</div>
			<img src={heroWoman} alt='Workout' className='h-50 w-50 justify center' />
		</main>
	);
};

export default Login;
