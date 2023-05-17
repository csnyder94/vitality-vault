import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import githubLogo from '../../images/github-logo.png';

const Footer = () => {
	const location = useLocation();
	const navigate = useNavigate();
	return (
		<footer className='inset-x-0 bottom-0 mt-auto bg-amber-500 p-4'>
			<div className='container mx-auto text-center justify-center'>
				<div className='flex items-center justify-center'>
					<a href='https://github.com/csnyder94/vitality-vault' target='_blank' rel='noopener noreferrer'>
						<img src={githubLogo} alt='Github Logo' className='h-10 w-10' />
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
