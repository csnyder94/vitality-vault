import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../utils/mutations';

const UserDataForm = (props) => {
	const [age, setAge] = useState(props?.age || 0);
	const [height, setHeight] = useState(props?.height || 0);
	const heightOptions = [
		{ value: '0', label: 'Select Height' },
		{ value: '1', label: '4 ft 11 in' },
		{ value: '2', label: '5 ft 0 in' },
		{ value: '3', label: '5 ft 1 in' },
		{ value: '4', label: '5 ft 2 in' },
		{ value: '5', label: '5 ft 3 in' },
		{ value: '6', label: '5 ft 4 in' },
		{ value: '7', label: '5 ft 5 in' },
		{ value: '8', label: '5 ft 6 in' },
		{ value: '9', label: '5 ft 7 in' },
		{ value: '10', label: '5 ft 8 in' },
		{ value: '11', label: '5 ft 9 in' },
		{ value: '12', label: '5 ft 10 in' },
		{ value: '13', label: '5 ft 11 in' },
		{ value: '14', label: '6 ft 0 in' },
		{ value: '15', label: '6 ft 1 in' },
		{ value: '16', label: '6 ft 2 in' },
		{ value: '17', label: '6 ft 3 in' },
		{ value: '18', label: '6 ft 4 in' },
		{ value: '19', label: '6 ft 5 in' },
		{ value: '20', label: '6 ft 6 in' },

	];
	const [weight, setWeight] = useState(props?.weight || 0);
	const [BMI, setBMI] = useState(props?.bmi || 0);
	const [neck, setNeck] = useState(props?.neck || 0);
	const [chest, setChest] = useState(props?.chest || 0);
	const [waist, setWaist] = useState(props?.waist || 0);

	const [updateUser] = useMutation(UPDATE_USER);
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const userData = {
				age: Number(age),
				height: Number(height),
				weight: Number(weight),
				bmi: Number(BMI),
				neck: Number(neck),
				chest: Number(chest),
				waist: Number(waist)
			};

			const info = {
				userData: userData
			}
			console.log(userData);
			const { data } = await updateUser({
				variables: {
					...info
				}
			});
			console.log(data);
		} catch (error) {
		}
	}
	const handleInputChange = (e) => {
		const { target } = e;
		const inputType = target.name;
		const inputValue = target.value;

		if (inputType === 'age') {
			setAge(inputValue);
		} else if (inputType === 'height') {
			setHeight(inputValue);
		} else if (inputType === 'weight') {
			setWeight(inputValue);
		} else if (inputType === 'BMI') {
			setBMI(inputValue);
		} else if (inputType === 'neck') {
			setNeck(inputValue);
		} else if (inputType === 'chest') {
			setChest(inputValue);
		} else if (inputType === 'waist') {
			setWaist(inputValue);
		}
	};
	return (
		<form className="w-full max-w-lg" onSubmit={handleSubmit}>
			<div className="flex flex-wrap -mx-3 mb-6">
				<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
					<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-age">
						Age
					</label>
					<input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
						value={age}
						name="age"
						onChange={handleInputChange}>
					</input>
				</div>
				<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
					<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-height">
						Height
					</label>
					<select
						className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
						value={height}
						name="height"
						onChange={handleInputChange}
					>
						{heightOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div>
				<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
					<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-weight">
						Weight
					</label>
					<input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
						value={weight}
						name="weight"
						onChange={handleInputChange}>
					</input>
				</div>
				<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
					<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-bmi">
						BMI
					</label>
					<input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
						value={BMI}
						name="BMI"
						onChange={handleInputChange}>
					</input>
				</div>
				<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
					<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-neck">
						Neck
					</label>
					<input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
						value={neck}
						name="neck"
						onChange={handleInputChange}>
					</input>
				</div>
				<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
					<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-chest">
						Chest
					</label>
					<input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
						value={chest}
						name="chest"
						onChange={handleInputChange}>
					</input>
				</div>
				<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
					<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-waist">
						Waist
					</label>
					<input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
						value={waist}
						name="waist"
						onChange={handleInputChange}>
					</input>
				</div>
			</div>
			<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
				<button type='submit' className='btn btn-lg bg-amber-400 m-2'>Submit</button>
			</div>
		</form>
	);
};

export default UserDataForm;