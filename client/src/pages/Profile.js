import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import barbells from '../images/barbell.png';

import UserDataForm from '../components/UserDataForm';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
	const { username: userParam } = useParams();

	const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
		variables: { username: userParam },
	});

	const user = data?.me || data?.user || {};

	if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
		return <Navigate to='/me' />;
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!user?.username) {
		return <h4>You need to be logged in to see this. Use the navigation links above to sign up or log in!</h4>;
	}

	return (
		<div>
			<h2 className='w-full text-center bg-amber-400 text-amber-800 p-3 mb-5'>
				Viewing {userParam ? `${user.username}'s` : 'your'} profile.
			</h2>

			<div className='flex flex-col md:flex-row justify-center items-start md:items-center mb-3 space-y-3 md:space-y-0 md:space-x-6'>
				<div className='w-full md:w-1/2 mb-5'>
					<UserDataForm
						age={user.age}
						height={user.height}
						weight={user.weight}
						bmi={user.bmi}
						neck={user.neck}
						chest={user.chest}
						waist={user.waist}
					/>
				</div>

				<div className='flex items-center justify-center w-full md:w-1/2'>
					<img src={barbells} alt='Profile' className='rounded-full h-24 w-24 md:h-80 md:w-80' />
				</div>
			</div>

			{!userParam && <div className='w-full mb-3 p-3'></div>}
		</div>
	);
};

export default Profile;
