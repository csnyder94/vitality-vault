import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query User($username: String!) {
  user(username: $username) {
    _id
    username
    email
    password
    exercises {
      _id
      type
      weight
      reps
      note
      date
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

export const QUERY_EXERCISES = gql`
query Exercises {
  exercises {
    _id
    type
    weight
    reps
    note
    date
  }
}
`;

export const QUERY_SINGLE_EXERCISE = gql`
query Exercise($exerciseId: ID!) {
  exercise(exerciseId: $exerciseId) {
    _id
    type
    weight
    reps
    note
    date
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
        type
        weight
        reps
        note
        date
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
