import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query User($username: String!) {
  user(username: $username) {
    _id
    username
    email
    exercises {
      _id
      name
      description
      type
      date
    }
  }
}
`;

export const QUERY_EXERCISES = gql`
query Exercises {
  exercises {
    _id
    name
    description
    date
    type
  }
}
`;

export const QUERY_SINGLE_EXERCISE = gql`
query getSingleExercise($exerciseId: ID!) {
  exercise(exerciseId: $exerciseId) {
    _id
    name
    description
    date
    type
  }
}
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      password
      exercises {
        _id
        name
        description
        date
        type
      }
      age
      height
      weight
      bmi
      neck
      chest
      waist
    }
  }
`;
