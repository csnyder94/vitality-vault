import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_EXERCISE } from '../../utils/mutations';
import { QUERY_EXERCISES, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const ExerciseForm = () => {
  const [name, setExerciseName] = useState('');
  const [description, setExerciseDescription] = useState('');
  const [type, setExerciseType] = useState('');

  const [addExercise, { error }] = useMutation(ADD_EXERCISE, {
    update(cache, { data: { addExercise } }) {
      try {
        const { exercises } = cache.readQuery({ query: QUERY_EXERCISES });

        cache.writeQuery({
          query: QUERY_EXERCISES,
          data: { exercises: [addExercise, ...exercises] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      // const { me } = cache.readQuery({ query: QUERY_ME });
      // cache.writeQuery({
      //   query: QUERY_ME,
      //   data: { me: { ...me, exercises: [...me.exercises, addExercise] } },
      // });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addExercise({
        variables: {
          name,
          description,
          type,
        },
      });

      setExerciseName('');
      setExerciseDescription('');
      setExerciseType('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'exerciseName') {
      setExerciseName(value);
    
    }
    if (name === 'exerciseDescription') {
      setExerciseDescription(value);
    
    }
    if (name === 'exerciseType') {
      setExerciseType(value);
    
    }
  };

  return (
    <div>
      <h3>What exercise will you complete today?</h3>

      {Auth.loggedIn() ? (
        <>
         
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <input 
              name='exerciseName'
              placeholder='Exercise Name'
              value={name}
              className='form-input w-100'
              style={{ lineHeight: '1.5', resize: 'vertical' }}
              onChange={handleChange}
              ></input>
              <textarea
                name="exerciseDescription"
                placeholder="Here's today's exercise:"
                value={description}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
               <input 
              name='exerciseType'
              placeholder='Exercise Type'
              value={type}
              className='form-input w-100'
              style={{ lineHeight: '1.5', resize: 'vertical' }}
              onChange={handleChange}
              ></input>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Exercise
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to track your workouts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ExerciseForm;
