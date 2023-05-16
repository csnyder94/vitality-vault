import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
	const logout = (event) => {
		event.preventDefault();
		Auth.logout();
	};
	return (
		<header className='bg-orange-200 text-white mb-4 py-3 flex flex-row items-center'>
			<div className='container mx-auto flex flex-row justify-between items-right'>
				<div>
					<Link className='text-4xl' to='/'>
						<h1 className='m-0'>Vitality Vault</h1>
					</Link>
					<p className='m-0'>Elevate Your Health, Embrace the Power of Exercise</p>
				</div>
				<div>
					{Auth.loggedIn() ? (
						<>
							<Link className='btn btn-lg bg-blue-300 m-2' to='/me'>
								{Auth.getProfile().data.username}'s profile
							</Link>
							<button className='btn btn-lg bg-white m-2' onClick={logout}>
								Logout
							</button>
						</>
					) : (
						<>
							<Link className='btn btn-lg bg-blue-300 m-2' to='/login'>
								Login
							</Link>
							<Link className='btn btn-lg bg-red m-2' to='/signup'>
								Sign Up
							</Link>
						</>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
