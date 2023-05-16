import React from 'react';
import { useQuery } from '@apollo/client';

import ExerciseList from '../components/ExerciseList';
import ExerciseForm from '../components/ExerciseForm';

import { QUERY_EXERCISES } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_EXERCISES);

  console.log(data)
  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <ExerciseForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ExerciseList
              exercises={data.exercises}
            />
          )
          }
        </div>
      </div>
    </main>
  );
};

export default Home;
