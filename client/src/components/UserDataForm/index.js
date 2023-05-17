import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../utils/mutations';
import Auth from '../../utils/auth'

const UserDataForm = (props) => {

    const [age, setAge] = useState(props.age);
    const [height, setHeight] = useState(props.height);
    const [weight, setWeight] = useState(props.weight);
    const [BMI, setBMI] = useState(props.bmi);
    const [neck, setNeck] = useState(props.neck);
    const [chest, setChest] = useState(props.chest);
    const [waist, setWaist] = useState(props.waist);

    const [updateUser, { userData, error }] = useMutation(UPDATE_USER)
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const { userData } = await updateUser({
                variables: {
                    age: age,
                    height: height,
                    weight: weight,
                    bmi: BMI,
                    neck: neck,
                    chest: chest,
                    waist: waist
                }
            });
            // Auth.login(data.login.token)
            console.log(userData)
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
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-height">
                        Height
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        value={height}
                        name="height"
                        onChange={handleInputChange}>
                    </input>
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
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        value={BMI}
                        name="BMI"
                        onChange={handleInputChange}>
                    </input>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-neck">
                        Neck
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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