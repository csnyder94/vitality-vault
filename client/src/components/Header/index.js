import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/vv-logo.png';

import Auth from '../../utils/auth';

const Header = () => {
	const logout = (event) => {
		event.preventDefault();
		Auth.logout();
	};
	return (
		<header className='bg-amber-500 text-white mb-4 py-3 flex justify-between items-center'>
			<div className='container mx-auto flex justify-between items-center'>
				<div className='flex items-center'>
					<img src={logo} alt='Vitality Vault' className='h-20 w-20' />
					<div>
						<Link className='md:text-4xl text-xs' to='/'>
							<h1 className='ml-2'>Vitality Vault</h1>
						</Link>
						<p className='m-0'>Elevate Your Health, Embrace the Power of Exercise</p>
					</div>
				</div>
				<div>
					{Auth.loggedIn() ? (
						<>
							<Link className='btn btn-lg bg-amber-400 m-2' to='/me'>
								{Auth.getProfile().data.username}'s profile
							</Link>
							<Link className='btn btn-lg bg-amber-400 m-2' onClick={logout}>
								Logout
							</Link>
						</>
					) : (
						<>
							<Link className='btn btn-lg bg-amber-400 m-2' to='/login'>
								Login
							</Link>
							<Link className='btn btn-lg bg-amber-400 m-2' to='/signup'>
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
